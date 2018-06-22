// mongoose model class for user

const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose; // above destructured
/* 
  Schema Use:
  Schema defines the unique set of properties in each model instance
  Mongoose wants to know ahead of time every property
  */

const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  } // pass object for multiple options
});
// 'users' is name of collection in mongoDB
mongoose.model("users", userSchema);
// make a new collection of name users with model userSchema that defines the properties inside of it
