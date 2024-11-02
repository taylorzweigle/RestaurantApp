//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  creationUser: {
    type: String,
    required: true,
  },
  creationTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
