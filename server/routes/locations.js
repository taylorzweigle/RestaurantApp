//Taylor Zweigle, 2024
const express = require("express");

const {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getLocations);

router.get("/:id", getLocation);

router.post("/", createLocation);

router.patch("/:id", updateLocation);

router.delete("/:id", deleteLocation);

module.exports = router;
