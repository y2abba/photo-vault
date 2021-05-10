## Photo Vault

**Web app can be seen online here:**
https://y2abba-photo-vault.com/

**Description:**

Create an account, sign in, and get started!
You can upload and delete as many photos as you want, these photos are linked to your account, and are your's only!
Search for an image by its filename and click on an image to get access to its public URL, and share it with friends if you want!
Feel free to play around!

**How do I use this application?**

<ol>
  <li>Create an account on the app, the process is quite straightforward like most account set-ups. This will create a profile with the applications and will be used to store your uploaded images</li>
  <li>Upload an image by using the upload button, you can upload as many photos as you'd like</li>
  <li>Delete an image by selecting desired images to delete, and then deleting them by using the delete button</li>
  <li>Click on an image to see its URL, and its expanded form</li>
</ol>

**More details**

<ul>
  <li>This app was made with AWS Amplify and uses AWS S3 as the storage service for your photos.</li>
<li>You can click on any image and get to see the S3 URL for your image. This URL is public, however, it is very hard to gain access to any random uploaded image as these URLS contain UUIDs to prevent spontaneous access.</li>
  <li>Accounts are managed with AWS Cognito and user profiles are stored in a DynamoDB database.</li>
</ul>

**Some tests**

Try uploading a non-image file, the system will prevent you from doing so.

Try making multiple user profiles and uploading the same image to each profile, you'll notice that the urls are all different, and each user profile has a differentiated set of images from other profiles.

Try accessing a deleted image's url, you will see that the url no longer shows the photo, indicating a hard delete.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
