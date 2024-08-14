//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { getRestaurants, getRestaurant, updateRestaurant, deleteRestaurant } from "../api/restaurants";

import RestaurantForm from "../components/forms/RestaurantForm";

const CreateRestaurantPage = () => {
  const params = useParams();

  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { dispatchRestaurants } = useRestaurantsContext();

  const [restaurant, setRestaurant] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [visited, setVisited] = useState("");

  const [restaurantError, setRestaurantError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [visitedError, setVisitedError] = useState("");

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const json = await getRestaurant(params.id, user.token);

      if (json.json) {
        setRestaurant(json.json.restaurant);
        setCity(json.json.city);
        setState(json.json.state);
        setType(json.json.type);
        setRating(json.json.rating);
        setVisited(json.json.visited ? "Yes" : "No");
      }
    };

    if (params.id && user) {
      fetchRestaurant();
    }
  }, [params.id, user]);

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

    setRestaurant(data.restaurant);
    setCity(data.city);
    setState(data.state);
    setType(data.type);
    setRating(data.rating);
    setVisited(data.visited);

    const newRestaurant = {
      restaurant: data.restaurant,
      city: data.city,
      state: data.state,
      type: data.type,
      rating: data.rating,
      visited: data.visited === "Yes" ? true : data.visited === "No" ? false : null,
      creationTime: new Date(),
    };

    const json = await updateRestaurant(params.id, newRestaurant, user.token);

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
      if (json.error.includes("visited")) {
        setVisitedError("Visited is required");
      }

      setLoading(false);
    }

    if (json.json) {
      const restaurants = await getRestaurants(user.token);

      if (restaurants.json) {
        dispatchRestaurants({ type: Actions.GET_RESTAURANTS, payload: restaurants.json });
      }

      navigate(-1);

      clearForm();
    }
  };

  const handleOnDelete = async () => {
    setDeleteLoading(true);

    if (deleteLoading) {
      return;
    }

    const json = await deleteRestaurant(params.id, user.token);

    if (json.json) {
      dispatchRestaurants({ type: Actions.DELETE_RESTAURANT, payload: json.json });

      navigate(-1);
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
    setVisitedError("");
  };

  return (
    <div>
      <div className="text-xl">Edit Restaurant</div>
      <RestaurantForm
        data={{ restaurant, city, state, type, rating, visited }}
        errors={{ restaurantError, cityError, stateError, typeError, ratingError, visitedError }}
        loading={{ loading, deleteLoading }}
        onSubmit={handleOnSubmit}
        onDelete={handleOnDelete}
        onCancel={handleOnCancel}
      />
    </div>
  );
};

export default CreateRestaurantPage;
