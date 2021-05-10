/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_PHOTOAPP_COMMENTTABLE_ARN
	API_PHOTOAPP_COMMENTTABLE_NAME
	API_PHOTOAPP_GRAPHQLAPIIDOUTPUT
	API_PHOTOAPP_PHOTOTABLE_ARN
	API_PHOTOAPP_PHOTOTABLE_NAME
	API_PHOTOAPP_USERTABLE_ARN
	API_PHOTOAPP_USERTABLE_NAME
	AUTH_PHOTOREPOSITORY_USERPOOLID
	ENV
	REGION
	STORAGE_PHOTOS_BUCKETNAME
Amplify Params - DO NOT EDIT */

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
// require("dotenv").config();
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "us-east-2",
});

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/upload", function (req, res) {
  // Add your code here
  // let keyValue = "test.png";
  let { userName, fileName, contentType } = req.body;
  try {
    if (!userName || !fileName) {
      res.json({
        success: false,
        uploadURL: "",
        filename: fileName,
      });
      return;
    }

    const s3Params = {
      Bucket: "photorepo224728-staging",
      Key: `${userName}/${uuidv4()}-${fileName}`,
      ContentType: contentType,
    };

    let prom = s3.getSignedUrlPromise("putObject", s3Params);
    let uploadURL = "";
    prom.then(
      function (url) {
        console.log("The URL is", url);
        uploadURL = url;
        res.json({
          success: true,
          uploadURL: uploadURL,
          filename: fileName,
        });
      },
      function (err) {
        console.log(err);
        res.json({
          success: false,
          uploadURL: uploadURL,
          filename: fileName,
        });
      }
    );
  } catch (e) {
    res.json({
      success: false,
    });
  }
});

app.post("/upload/*", function (req, res) {
  // Add your code here
  // Add your code here
  let { keys } = req.body;
  try {
    const objects = keys.map((key) => ({ Key: key }));

    const s3Params = {
      Bucket: "photorepo224728-staging",
      Delete: { Objects: objects },
    };
    s3.deleteObjects(s3Params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        res.json({
          success: false,
          error: err,
        });
      } else {
        // success
        console.log(data);
        res.json({
          success: true,
          data: data,
        });
      }
    });
  } catch (e) {
    res.json({
      success: false,
    });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
