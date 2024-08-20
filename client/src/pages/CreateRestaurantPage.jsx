//Taylor Zweigle, 2024
import React from "react";

import Typography from "../core/typography/Typography";

import RestaurantForm from "../components/forms/RestaurantForm";

const CreateRestaurantPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Typography variant="heading" color="primary">
        Add Restaurant
      </Typography>
      <RestaurantForm />
    </div>
  );
};

export default CreateRestaurantPage;
