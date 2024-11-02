//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Location = require("../models/locationModel");

const getLocations = async (req, res) => {
  const creationUser = req.user._id;

  const locations = await Location.find({ creationUser }).sort({ creationTime: -1 });

  res.status(200).json(locations);
};

const getLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid location id" });
  }

  const location = await Location.findById(id);

  if (!location) {
    return res.status(404).json({ error: "No location found" });
  }

  res.status(200).json(location);
};

const createLocation = async (req, res) => {
  const { city, state, category } = req.body;

  try {
    const creationUser = req.user._id;
    const creationTime = new Date();

    const location = await Location.create({
      city,
      state,
      category,
      creationUser,
      creationTime,
    });

    res.status(200).json(location);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid location id" });
  }

  try {
    const location = await Location.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(200).json(location);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid location id" });
  }

  const location = await Location.findOneAndDelete({ _id: id });

  if (!location) {
    return res.status(404).json({ error: "No location found" });
  }

  res.status(200).json(location);
};

module.exports = {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
