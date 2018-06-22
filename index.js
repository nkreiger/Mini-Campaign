// Route file, or starter file
const express = require("express");
// node.js does not have support from E6,
// so we use common js modules
// import vs require :
// common vs ES6

// bring in mongoose
const mongoose = require("mongoose");

// tell express it must make use of cookies when using passport
const cookieSession = require("cookie-session");
const passport = require("passport");

// pull in body-parser middleware to get req.body
const bodyParser = require("body-parser");

// connect it to DB in keys so it is not posted to github
const keys = require("./config/keys");

//connect mongoose
mongoose.connect(keys.mongoURI);

// ########## MODELS ################
// THIS MUST BE ABOVE WHERE YOU USE IT, SO ABOVE PASSPORT
require("./models/User");
require("./models/Survey");
// don't have to require recipient because its included inside Survey

// pull in passport service, we are not returning anything in passport, so we do not need const passport because nothing to assign
require("./services/passport");

// Generate a new application that represents a running express app
const app = express(); // vast majority use single app
// this will listen for incoming requests, and route them on to different route handlers

// parser so every time a req has a req.body comes in then it will be assigned to the req.body property
app.use(bodyParser.json());

app.use(
  cookieSession({
    // age for auth cookies to last... 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // give cookie a key
    keys: [keys.cookieKey]
  })
);

// tell passport to use cookies
app.use(passport.initialize());
app.use(passport.session());
// done with authentication flow

//require that file returns a function, which is then immediately called with the app object
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // if in production make sure express will serve up production assets
  // like main.js
  app.use(express.static("client/build"));

  // Express will serve up index.html file if it doesn't recognize the routes
  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// dynamically figure out what port to listen to... Heroku, heroku will inject env variables in moment of deploy, but only works in production not development environment
const PORT = process.env.PORT || 5000; // if heroku port exists assign it that, else, assign it 5000

app.listen(PORT); // listen for requests and route them to the correct handler on port 5000

/* ###### HEROKU PREDEPLOY ##### */
// specifiy node version and start script for heroku in package.json
// make .gitignore for dependencies which should not be committed on deploy, heroku will install them itself

// app.use wires up middleware for our application

// ############### TIPS
/*
 Google first, because its been asked before...
 Run in module
 */
