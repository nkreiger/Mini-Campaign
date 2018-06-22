// mongoose model class

const mongoose = require("mongoose");

const { Schema } = mongoose;

// import sub model schema
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], // for...Email, Clicked, array of objects
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  // reference to another instance of a user
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
