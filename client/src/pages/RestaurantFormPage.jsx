//Taylor Zweigle, 2024
import React, { useState } from "react";
import { useNavigate } from "react-router";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { createRestaurant } from "../api/restaurants";

const RestaurantFormPage = () => {
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!user) {
      return;
    }

    if (loading) {
      return;
    }

    const newRestaurant = {
      restaurant: restaurant,
      city: city,
      state: state,
      type: type,
      rating: rating,
      visited: visited === "Yes" ? true : visited === "No" ? false : null,
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
    setRestaurant("");
    setCity("");
    setState("");
    setType("");
    setRating("");
    setVisited("");

    setRestaurantError("");
    setCityError("");
    setStateError("");
    setTypeError("");
    setRatingError("");
    setVisitedError("");
  };

  return (
    <div>
      <div className="text-xl">Add Restaurant</div>
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-0">
          <label htmlFor="restaurant">Restaurant</label>
          <input
            type="text"
            id="restaurant"
            name="restaurant"
            className="p-4 border border-gray-400"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
          />
          {restaurantError && <div className="text-md text-red-600">{restaurantError}</div>}
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            className="p-4 bg-white border border-gray-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value=""></option>
            <option value="Addison">Addison</option>
            <option value="Allen">Allen</option>
            <option value="Coppell">Coppell</option>
            <option value="Dallas">Dallas</option>
            <option value="Fort Worth">Fort Worth</option>
            <option value="Frisco">Frisco</option>
            <option value="Grapevine">Grapevine</option>
            <option value="Irving">Irving</option>
            <option value="McKinney">McKinney</option>
            <option value="Plano">Plano</option>
            <option value="The Colony">The Colony</option>
          </select>
          {cityError && <div className="text-md text-red-600">{cityError}</div>}
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            className="p-4 bg-white border border-gray-400"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value=""></option>
            <option value="TX">TX</option>
          </select>
          {stateError && <div className="text-md text-red-600">{stateError}</div>}
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            className="p-4 border border-gray-400"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          {typeError && <div className="text-md text-red-600">{typeError}</div>}
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            className="p-4 bg-white border border-gray-400"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value=""></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {ratingError && <div className="text-md text-red-600">{ratingError}</div>}
          <label htmlFor="visited">Visited</label>
          <select
            id="visited"
            name="visited"
            className="p-4 bg-white border border-gray-400"
            value={visited}
            onChange={(e) => setVisited(e.target.value)}
          >
            <option value=""></option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {visitedError && <div className="text-md text-red-600">{visitedError}</div>}
        </div>
      </form>
      <button className="p-4 bg-slate-600 text-white" onClick={handleOnCancel}>
        Cancel
      </button>
      <button className="p-4 bg-sky-600 text-white" onClick={handleOnSubmit}>
        {loading ? <DataUsageIcon fontSize="sm" className="animate-spin" /> : "Save"}
      </button>
    </div>
  );
};

export default RestaurantFormPage;
