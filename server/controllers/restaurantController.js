//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Restaurant = require("../models/restaurantModel");

const getRestaurants = async (req, res) => {
  const creationUser = req.user._id;

  const restaurants = await Restaurant.find({ creationUser }).sort({ creationTime: -1 });

  res.status(200).json(restaurants);
};

const getRestaurant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid restaurant id" });
  }

  const restaurant = await Restaurant.findById(id);

  if (!restaurant) {
    return res.status(404).json({ error: "No restaurant found" });
  }

  res.status(200).json(restaurant);
};

const createRestaurant = async (req, res) => {
  const { restaurant, city, state, type, rating, visited } = req.body;

  try {
    const creationUser = req.user._id;
    const creationTime = new Date();

    const newRestaurant = await Restaurant.create({
      restaurant,
      city,
      state,
      type,
      rating,
      visited,
      creationUser,
      creationTime,
    });

    res.status(200).json(newRestaurant);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid restaurant id" });
  }

  try {
    const restaurant = await Restaurant.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid restaurant id" });
  }

  const restaurant = await Restaurant.findOneAndDelete({ _id: id });

  if (!restaurant) {
    return res.status(404).json({ error: "No restaurant found" });
  }

  res.status(200).json(restaurant);
};

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
