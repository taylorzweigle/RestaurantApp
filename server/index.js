//Taylor Zweigle, 2024
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const restaurantRoutes = require("./routes/restaurants");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}...`);
    });
  })
  .catch((error) => console.log(error));
