//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  restaurant: {
    type: String,
    required: true,
  },
  locations: {
    type: Array,
    required: true,
  },
  locationCategory: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  rating: {
    type: Object,
    required: false,
  },
  cost: {
    type: String,
    required: true,
  },
  visited: {
    type: Boolean,
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

module.exports = mongoose.model("Restaurant", restaurantSchema);
