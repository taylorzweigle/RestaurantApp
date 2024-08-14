//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";

import DataUsageIcon from "@mui/icons-material/DataUsage";

const RestaurantForm = ({ data, errors, loading, onSubmit, onDelete, onCancel }) => {
  const [restaurant, setRestaurant] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");
  const [visited, setVisited] = useState("");

  useEffect(() => {
    if (data) {
      setRestaurant(data.restaurant);
      setCity(data.city);
      setState(data.state);
      setType(data.type);
      setRating(data.rating);
      setVisited(data.visited);
    }
  }, [data]);

  return (
    <>
      <form>
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
          {errors.restaurantError && <div className="text-md text-red-600">{errors.restaurantError}</div>}
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
          {errors.cityError && <div className="text-md text-red-600">{errors.cityError}</div>}
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
          {errors.stateError && <div className="text-md text-red-600">{errors.stateError}</div>}
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            className="p-4 border border-gray-400"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          {errors.typeError && <div className="text-md text-red-600">{errors.typeError}</div>}
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
          {errors.ratingError && <div className="text-md text-red-600">{errors.ratingError}</div>}
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
          {errors.visitedError && <div className="text-md text-red-600">{errors.visitedError}</div>}
        </div>
      </form>
      <button className="p-4 bg-slate-600 text-white" onClick={onCancel}>
        Cancel
      </button>
      {onDelete && (
        <button className="p-4 bg-red-600 text-white" onClick={onDelete}>
          {loading.deleteLoading ? <DataUsageIcon fontSize="sm" className="animate-spin" /> : "Delete"}
        </button>
      )}
      <button
        className="p-4 bg-sky-600 text-white"
        onClick={(e) => onSubmit(e, { restaurant, city, state, type, rating, visited })}
      >
        {loading.loading ? <DataUsageIcon fontSize="sm" className="animate-spin" /> : "Save"}
      </button>
    </>
  );
};

export default RestaurantForm;
