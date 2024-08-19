//Taylor Zweigle, 2024
import React from "react";

import RestaurantForm from "../components/forms/RestaurantForm";

const CreateRestaurantPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-xl">Add Restaurant</div>
      <RestaurantForm />
    </div>
  );
};

export default CreateRestaurantPage;
