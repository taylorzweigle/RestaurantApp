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

router.get("/:category", getRestaurants);
router.get("/:category/:query", getRestaurants);

router.get("/:category/:id", getRestaurant);

router.post("/:category", createRestaurant);

router.patch("/:category/:id", updateRestaurant);

router.delete("/:category/:id", deleteRestaurant);

module.exports = router;
