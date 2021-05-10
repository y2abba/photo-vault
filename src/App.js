import "./App.css";
import { Helmet } from "react-helmet";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import React, { useState, useEffect, useContext } from "react";
import Amplify, {
  Auth,
  Storage,
  Hub,
  Cache,
  Logger,
  API,
  graphqlOperation,
} from "aws-amplify";
import * as mutations from "./graphql/mutations.js";
import * as queries from "./graphql/queries.js";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableFooter,
  Checkbox,
  MuiThemeProvider,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import {
  TextField,
  Box,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  Input,
  InputLabel,
  Tooltip,
  MenuItem,
  Select,
  Switch,
  Chip,
  Avatar,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Paper from "@material-ui/core/Paper";
import CreateIcon from "@material-ui/icons/Create";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import config from "./aws-exports";

const axios = require("axios");

Amplify.configure(config);
API.configure(config);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    maxWidth: 400,
  },
  media: {
    height: 200,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: "#7AD7F0" },
    secondary: { main: "#77DD77" },
  },
});
function App() {
  const [user, setUser] = useState(null);
  const [tableUser, setTableUser] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [files, setFiles] = useState([]);
  const [msgOpen, setMsgOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [uploadDialog, setUploadDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageDialog, setImageDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  const classes = useStyles();

  const registerNewUser = async (data) => {
    // console.log("registernewuser", data);
    const authUser = await Auth.currentAuthenticatedUser();
    if (!authUser && !authUser.username) return;
    const getUserResult = await API.graphql(
      graphqlOperation(queries.getUser, {
        id: authUser.username,
      })
    );

    // console.log("user result", getUserResult);
    if (getUserResult.data && getUserResult.data.getUser) {
      setTableUser(getUserResult.data.getUser);

      setPhotos(
        getUserResult.data.getUser
          ? getUserResult.data.getUser.photos.items.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
          : []
      );
      Cache.setItem("user", getUserResult.data.getUser);
    } else if (getUserResult.data && !getUserResult.data.getUser) {
      let input = {
        id: authUser.username,
        name: authUser.attributes.email,
        balance: 10,
      };

      const createUserResult = await API.graphql(
        graphqlOperation(mutations.createUser, { input })
      );
      // console.log("create user result = ", createUserResult);

      const getNewUserResult = await API.graphql(
        graphqlOperation(queries.getUser, {
          id: user.username,
        })
      );
      // console.log("get new user result = ", getNewUserResult);
      Cache.setItem("user", getNewUserResult.data.getUser);
    }
  };

  const onAuthEvent = async (payload) => {
    console.log("in onAuthEvent", payload);
    switch (payload.event) {
      case "signIn":
        // console.log("signed in");
        // console.log(payload.data);
        setUsername(payload.data && payload.data.username);
        break;
      case "signUp":
        console.log("signed up", payload);
        break;
      case "signOut":
        // console.log("signed out");
        window.location.reload(true);
        Cache.clear();
        setUser(null);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    // console.log("in use effect");
    let mounted = true;
    const abortController = new AbortController();
    if (mounted) {
      Hub.listen("auth", (data) => {
        const { payload } = data;
        onAuthEvent(payload);
        if (payload.data) {
          console.log(
            "A new auth event has happened: " +
              payload.data.username +
              " has " +
              data.payload.event
          );
        } else {
          console.log("A new auth event has happened.");
        }
      });
    }
    const cleanup = () => {
      mounted = false;
      abortController.abort();
    };
    return cleanup;
  }, []);

  const uploadFiles = async () => {
    setUploading(true);
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    const tableUser = await Cache.getItem("user");

    const promises = files.map(async (file) => {
      const requestData = {
        headers: {
          Authorization: token,
        },
        body: {
          userName: user.username,
          fileName: file.name,
          contentType: file.type,
        },
      };
      const response = await API.post("uploadapi", "/upload", requestData);
      var options = {
        headers: {
          "Content-Type": file.type,
          // "x-amz-acl": "public-read",
        },
      };
      const result = await axios.put(response.uploadURL, file, options);

      if (result && response.uploadURL) {
        let input = {
          title: file.name,
          price: 0,
          url: response.uploadURL.split("?")[0],
          userID: user.username,
        };
        const createPhotoResult = await API.graphql(
          graphqlOperation(mutations.createPhoto, { input })
        );
        // console.log("Create photo result", createPhotoResult);
      }
    });
    Promise.all(promises).then(() => {
      // do what you want on the results
      setFiles([]);
      setUploading(false);
    });
  };
  const handleAddFiles = (e) => {
    const newFiles = e.target.files;
    const fileArr = Array.from(newFiles);
    let success = true;
    fileArr.forEach((file) => {
      if (
        file &&
        file.type &&
        file.type.substring(0, file.type.indexOf("/")) === "image"
      ) {
      } else {
        setSnackMsg("Please input files that are only of the image type.");
        setMsgOpen(true);
        success = false;
      }
    });
    let tempArr = files.concat(fileArr);
    if (success && fileArr && fileArr.length > 0) {
      setFiles(tempArr);
    }
  };

  const deleteSelectedFiles = async (e) => {
    setUploading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      let keys = [];
      selectedImages.map((image) => {
        keys.push(
          decodeURI(
            image.url.replace(
              "https://photorepo224728-staging.s3.us-east-2.amazonaws.com/",
              ""
            )
          )
        );
      });
      const requestData = {
        headers: {
          Authorization: token,
        },
        body: {
          keys,
        },
      };
      const response = await API.post(
        "uploadapi",
        "/upload/delete",
        requestData
      );
      const promises = selectedImages.map(async (image) => {
        const deleteImageResult = await API.graphql(
          graphqlOperation(mutations.deletePhoto, { input: { id: image.id } })
        );
      });
      Promise.all(promises).then(() => {
        // do what you want on the results
        if (response) {
          setUploading(false);
          setSelectedImages([]);
        } else {
          setSnackMsg("An error was encountered deleting the images.");
          setMsgOpen(true);
        }
      });
    } catch (e) {
      setSnackMsg("An error was encountered deleting the images.");
      setMsgOpen(true);
    }
  };

  useEffect(() => {
    registerNewUser();
  }, [username]);

  useEffect(() => {
    if (uploading == false) {
      registerNewUser();
    }
  }, [uploading]);

  return (
    <div>
      <Helmet>
        <title>Photo Vault</title>
      </Helmet>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={msgOpen}
        autoHideDuration={3000}
        onClose={() => setMsgOpen(false)}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{snackMsg}</span>}
      />
      <MuiThemeProvider theme={theme}>
        <Backdrop className={classes.backdrop} open={uploading}>
          <CircularProgress color="primary" />
        </Backdrop>
        <Dialog
          open={imageDialog}
          maxWidth={"lg"}
          onClose={() => {
            setImageDialog(false);
          }}
        >
          <DialogContent>
            <Grid container align="center" direction="column">
              <img src={currentImage.url} alt={"None Found"} className="img" />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                window.open(currentImage.url ? currentImage.url : "", "_blank");
                setDeleteDialog(false);
              }}
              color="primary"
            >
              Link to Image
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setImageDialog(false);
                setCurrentImage({});
              }}
              color="primary"
            >
              Return
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={deleteDialog}
          fullWidth
          maxWidth={"md"}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            {`Are you sure you wish to delete the selected images?`}
          </DialogTitle>
          <DialogContent>
            <Grid container align="center" direction="column" spacing={2}>
              <Grid item>
                <Paper>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">File Name</TableCell>
                        <TableCell align="left">Uploaded At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedImages &&
                        selectedImages.length > 0 &&
                        selectedImages.map((item, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align="left">{item.title}</TableCell>
                              <TableCell align="left">
                                {item && item.createdAt
                                  ? new Date(item.createdAt).toDateString()
                                  : ""}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {selectedImages && selectedImages.length == 0 && (
                        <TableRow key={0}>
                          <TableCell align="center">
                            No images are selected
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setDeleteDialog(false);
                setSelectedImages([]);
                setPhotos(
                  photos.map((photo) => {
                    photo.selected = false;
                    return photo;
                  })
                );
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setDeleteDialog(false);
                deleteSelectedFiles();
              }}
              disabled={
                !selectedImages ||
                (selectedImages && selectedImages.length === 0)
              }
              color="primary"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={uploadDialog}
          fullWidth
          maxWidth={"lg"}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            {`Add Images to upload to your photo vault.`}
          </DialogTitle>
          <DialogContent>
            <Grid container align="center" direction="column" spacing={2}>
              <Grid item>
                <Grid container align="right">
                  <Grid item xs={12}>
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Add Images
                      </Button>
                    </label>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="contained-button-file"
                      type="file"
                      multiple
                      onChange={handleAddFiles}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Paper>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">File Name</TableCell>
                        <TableCell align="left">Last Modified</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {files &&
                        files.length > 0 &&
                        files.map((item, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align="left">{item.name}</TableCell>
                              <TableCell align="left">
                                {item && item.lastModifiedDate
                                  ? item.lastModifiedDate.toDateString()
                                  : ""}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  onClick={() => {
                                    setFiles(
                                      files.filter((item, i) => {
                                        return index !== i;
                                      })
                                    );
                                  }}
                                >
                                  <RemoveCircleIcon />
                                </IconButton>
                                {/* <IconButton onClick={() => {}}>
                                  <CreateIcon />
                                </IconButton> */}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {files && files.length == 0 && (
                        <TableRow key={0}>
                          <TableCell align="left">No images added.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setUploadDialog(false);
                // setFiles([]);
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                uploadFiles();
                setUploadDialog(false);
              }}
              disabled={!files || (files && files.length === 0)}
              color="primary"
            >
              Upload
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          className={classes}
          paddingTop={4}
          paddingLeft={6}
          paddingRight={6}
        >
          <Box
            style={{ position: "absolute", top: "25px", right: "15px" }}
            width={1 / 8}
            height={1 / 8}
          >
            <AmplifySignOut />
          </Box>
          <Grid container direction="column" spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Typography variant="h6" gutterBottom color="#00">
                  {tableUser && tableUser.name
                    ? `${tableUser.name}'s Photo Vault`
                    : "Photo Vault"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                align="center"
                justify="center"
                direction="column"
              >
                <Grid item xs={12}>
                  <TextField
                    id="Title"
                    label="Search by file name"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    margin="normal"
                    style={{ width: "70%" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid item>
                    <Grid container spacing={2} justify="center">
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setUploadDialog(true);
                          }}
                        >
                          Upload Images
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            if (!selectedImages || selectedImages.length == 0) {
                              setSnackMsg("Please select an image to delete.");
                              setMsgOpen(true);
                            } else setDeleteDialog(true);
                          }}
                        >
                          Delete Selected Images
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setSelectedImages([]);
                            setPhotos(
                              photos.map((item) => {
                                item.selected = false;
                                return item;
                              })
                            );
                          }}
                        >
                          Clear Selection
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {photos &&
                  photos.length > 0 &&
                  photos.map((photo, index) => {
                    return photo &&
                      photo.title
                        .toLowerCase()
                        .replace(" ", "")
                        .includes(searchValue.toLowerCase()) ? (
                      <Grid item xs={4}>
                        <Card className={classes.root}>
                          <CardMedia
                            className={classes.media}
                            image={photo.url}
                            title={photo.title}
                            onClick={() => {
                              setImageDialog(true);
                              setCurrentImage(photo);
                            }}
                          />
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {photo.title ? photo.title : ""}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => {
                                setImageDialog(true);
                                setCurrentImage(photo);
                              }}
                            >
                              Expand
                            </Button>
                            <Grid container justify="flex-end">
                              <IconButton
                                onClick={(e) => {
                                  setPhotos(
                                    photos.map((photo, index2) => {
                                      if (index2 == index) {
                                        photo.selected = !photo.selected;
                                      }
                                      return photo;
                                    })
                                  );
                                  setSelectedImages(
                                    photos.filter((photo) => {
                                      return photo.selected;
                                    })
                                  );
                                }}
                              >
                                {!photo.selected ? (
                                  <CheckBoxOutlineBlankIcon />
                                ) : (
                                  <CheckBoxIcon />
                                )}
                              </IconButton>
                            </Grid>
                          </CardActions>
                        </Card>
                      </Grid>
                    ) : (
                      ""
                    );
                  })}
                {(!photos || (photos && photos.length == 0)) &&
                  "No images found! Upload some images! :)"}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </MuiThemeProvider>
    </div>
  );
}

export default withAuthenticator(App);
