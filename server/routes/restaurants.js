//Taylor Zweigle, 2024
const express = require("express");

const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getRestaurants);

router.get("/:id", getRestaurant);

router.post("/", createRestaurant);

router.patch("/:id", updateRestaurant);

router.delete("/:id", deleteRestaurant);

module.exports = router;
