//Taylor Zweigle, 2024
import React, { useState } from "react";
import { useNavigate } from "react-router";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { createRestaurant } from "../api/restaurants";

import RestaurantForm from "../components/forms/RestaurantForm";

const CreateRestaurantPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { dispatchRestaurants } = useRestaurantsContext();

  const [restaurantError, setRestaurantError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [costError, setCostError] = useState("");
  const [visitedError, setVisitedError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e, data) => {
    e.preventDefault();

    clearForm();

    setLoading(true);

    if (!user) {
      return;
    }

    if (loading) {
      return;
    }

    const newRestaurant = {
      restaurant: data.restaurant,
      city: data.city,
      state: data.state,
      type: data.type,
      rating: data.rating,
      cost: data.cost,
      visited: data.visited === "Yes" ? true : data.visited === "No" ? false : null,
      creationTime: new Date(),
    };

    const json = await createRestaurant(newRestaurant, user.token);

    if (json.error) {
      if (json.error.includes("restaurant")) {
        setRestaurantError("Restaurant is required");
      }
      if (json.error.includes("city")) {
        setCityError("City is required");
      }
      if (json.error.includes("state")) {
        setStateError("State is required");
      }
      if (json.error.includes("type")) {
        setTypeError("Type is required");
      }
      if (json.error.includes("rating")) {
        setRatingError("Rating is required");
      }
      if (json.error.includes("cost")) {
        setCostError("Cost is required");
      }
      if (json.error.includes("visited")) {
        setVisitedError("Visited is required");
      }

      setLoading(false);
    }

    if (json.json) {
      dispatchRestaurants({ type: Actions.CREATE_RESTAURANT, payload: json.json });

      navigate(-1);

      clearForm();
    }
  };

  const handleOnCancel = () => {
    navigate(-1);

    clearForm();
  };

  const clearForm = () => {
    setRestaurantError("");
    setCityError("");
    setStateError("");
    setTypeError("");
    setRatingError("");
    setCostError("");
    setVisitedError("");
  };

  return (
    <div>
      <div className="text-xl">Add Restaurant</div>
      <RestaurantForm
        errors={{ restaurantError, cityError, stateError, typeError, ratingError, costError, visitedError }}
        loading={{ loading }}
        onSubmit={handleOnSubmit}
        onCancel={handleOnCancel}
      />
    </div>
  );
};

export default CreateRestaurantPage;
