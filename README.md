# Re-Do

Re-Do is a facial recognition, redaction and replacement web application that is free to use.

  - Front-End is built using React
  - Back-End is built using Node.js
  - Express is used for routing and middleware
  - PostgreSQL is used for databasing
  - Final application is hosted on both Heroku and Netlify

# Features!

  - Create and register accounts 
  - Login and use databasing features for facial recognition
  - Facial Recognition allows you to upload an initial photo with a person's face and upload a secondary photo to see if that person is in the image
  - When logged in the Facial Recognition feature allows you store multiple images of a person's face to increase recognition accuracy along with storing faces of multiple people so you can keep a catalog of individuals to recognise
  - The Facial Redaction/Replacement feature allows you to upload 1 or more photos of faces, an image to replace those faces with (if no image is selected for this then the faces are blurred), and a final image to detect and replace those faces. 
  - The Facial Redaction/Replacement feature comes with a reverse option to where you can choose if the initial uploaded faces that are detected should be replaced/redacted, or that all faces apart from those should be replace/redacted


### Tech

Re-Do makes use of a number of different frameworks/packages for full functionality:

* [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces!
* [Node.js](https://nodejs.org/en/) - Evented I/O for the back-end of Re-Do
* [Tachyons](https://tachyons.io/) - CSS Styling toolkit used for designing the front-end interface
* [Face-API.js](https://github.com/justadudewhohacks/face-api.js/) - Facial Recognition feature based on Tensorflow.js AAllows for the detection of facial landmarks which are then used to create Facial Recognition matchers for each face for comparisons and recognition
* [JIMP](https://www.npmjs.com/package/jimp) - JIMP is used in the Facial Replacement/Redaction feature to edit uploaded images to blur recognised faces or to blitz the uploaded replacement image of the recognised faces
* [Express](http://expressjs.com/) - Express is used for the middleware/routing between the front-end and the back-end
* [Canvas](https://www.npmjs.com/package/canvas) - Canvas is used to draw the images to the HTML page along with displaying the recognition results as an overlay on top of the image for the Facial Recognition feature
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Used for hashing passwords for each registered user in Re-Do
* [Nodemon](https://nodemon.io/) - Used to test the back-end server during development
* [Knex.js](http://knexjs.org/) - Node.js SQL Query builder to connect to PostgreSQL database
* [Objection](https://vincit.github.io/objection.js/) - Node.js SQL ORM used on top of Knex for relational query building
* [Postman](https://www.postman.com/) - Used for testing API end points during development for the server
* [PostgreSQL](https://www.postgresql.org/) - The relational database used to store users, user information, image data and descriptions, and login information
* [Heroku](https://www.heroku.com/) - The cloud platform service used for hosting both the back-end and server
* [Netlify](https://www.netlify.com/) - The cloud platform service used for hosting the front-end. Netlify was chosen over Heroku to resolve CORS issues as Netlify provides a SSL certificate for its hosted site whilst Heroku does not without purchasing their higher tier

### Installation

Re-Do requires [Node.js](https://nodejs.org/) to run when installing on a personal computer.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm build
```

### Todos

 - Write MORE Tests
 - Add in Redux functionality for setting states
 - Add in React-Router for routing instead of using my own routing system
 - Fix some potential Async-Await issues that are occurring on older specced/slower computers
 - Fix some styling issues that are occurring between computers and Firefox/Chrome