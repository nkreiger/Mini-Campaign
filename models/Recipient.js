const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false
  }
});

//export because its a sub class model
module.exports = recipientSchema;
