//Taylor Zweigle, 2024
const express = require("express");

const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getRestaurants);

router.get("/:id", getRestaurant);

router.post("/", createRestaurant);

router.delete("/:id", deleteRestaurant);

router.patch("/:id", updateRestaurant);

module.exports = router;
