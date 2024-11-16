//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Restaurant = require("../models/restaurantModel");

const getRestaurants = async (req, res) => {
  const creationUser = req.user._id;
  const { category, query } = req.params;

  let searchParams = null;

  let filteredRestaurants = [];

  switch (query.split("=")[0]) {
    case "Visited":
      searchParams = { visited: true };
      break;
    case "To Visit":
      searchParams = { visited: false };
    case "Locations":
      searchParams = { locations: { $all: [{ city: query.split("=")[1], state: "TX" }] } };
      break;
    case "Type":
      searchParams = { type: query.split("=")[1] };
      break;
    case "Cost":
      searchParams = { cost: query.split("=")[1] };
      break;
    default:
      searchParams = null;
  }

  const restaurants = await Restaurant.find({
    creationUser,
    locationCategory: category,
    ...searchParams,
  }).sort({ creationTime: -1 });

  if (query.split("=")[0] === "Rating") {
    console.log("Rating");

    filteredRestaurants = restaurants.filter(
      (restaurant) =>
        restaurant.visited &&
        ((parseInt(restaurant.rating.husband) + parseInt(restaurant.rating.wife)) / 2).toString() ===
          query.split("=")[1]
    );
  }

  res.status(200).json(filteredRestaurants.length > 0 ? filteredRestaurants : restaurants);
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
  const { restaurant, locations, locationCategory, type, rating, cost, visited } = req.body;

  try {
    const creationUser = req.user._id;
    const creationTime = new Date();

    const newRestaurant = await Restaurant.create({
      restaurant,
      locations,
      locationCategory,
      type,
      rating,
      cost,
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
