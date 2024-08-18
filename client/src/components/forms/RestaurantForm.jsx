//Taylor Zweigle, 2024
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import * as Actions from "../../actions/actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useRestaurantsContext } from "../../hooks/useRestaurantsContext";

import { getRestaurants, createRestaurant, updateRestaurant } from "../../api/restaurants";

const RestaurantForm = ({ id, data, edit }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: data
      ? {
          restaurant: data.restaurant,
          city: data.city,
          state: data.state,
          type: data.type,
          rating: data.rating,
          cost: data.cost,
          visited: data.visited,
        }
      : undefined,
  });

  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { dispatchRestaurants } = useRestaurantsContext();

  const [isCanceling, setIsCanceling] = useState(false);

  const handleOnSubmit = async (data) => {
    if (!user) {
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

    const json = edit
      ? await updateRestaurant(id, newRestaurant, user.token)
      : await createRestaurant(newRestaurant, user.token);

    if (json.error) {
      if (json.error.includes("restaurant")) {
        setError("restaurant", { message: "Restaurant is required" });
      }
      if (json.error.includes("city")) {
        setError("city", { message: "City is required" });
      }
      if (json.error.includes("state")) {
        setError("state", { message: "State is required" });
      }
      if (json.error.includes("type")) {
        setError("type", { message: "Type is required" });
      }
      if (json.error.includes("cost")) {
        setError("cost", { message: "Cost is required" });
      }
      if (json.error.includes("visited")) {
        setError("visited", { message: "Visited is required" });
      }
    }

    if (json.json) {
      if (edit) {
        const restaurants = await getRestaurants(user.token);

        if (restaurants.json) {
          dispatchRestaurants({ type: Actions.GET_RESTAURANTS, payload: restaurants.json });
        }
      } else {
        dispatchRestaurants({ type: Actions.CREATE_RESTAURANT, payload: json.json });
      }

      navigate(-1);
    }
  };

  const handleOnCancel = () => {
    setIsCanceling(true);

    navigate(-1);
  };

  return (
    <>
      <form>
        <div className="flex flex-col gap-0">
          <label htmlFor="restaurant">Restaurant</label>
          <input
            type="text"
            id="restaurant"
            name="restaurant"
            className="bg-white border border-gray-400 p-4"
            {...register("restaurant", { required: "Restaurant is required" })}
          />
          {errors.restaurant && <div className="text-md text-red-600">{errors.restaurant.message}</div>}
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            className="bg-white border border-gray-400 p-4"
            {...register("city", { required: "City is required" })}
          >
            <option value=""></option>
            <option value="Addison">Addison</option>
            <option value="Allen">Allen</option>
            <option value="Anna">Anna</option>
            <option value="Aubrey">Aubrey</option>
            <option value="Carrollton">Carrollton</option>
            <option value="Coppell">Coppell</option>
            <option value="Dallas">Dallas</option>
            <option value="Fairview">Fairview</option>
            <option value="Fort Worth">Fort Worth</option>
            <option value="Frisco">Frisco</option>
            <option value="Grapevine">Grapevine</option>
            <option value="Irving">Irving</option>
            <option value="McKinney">McKinney</option>
            <option value="Plano">Plano</option>
            <option value="Southlake">Southlake</option>
            <option value="The Colony">The Colony</option>
          </select>
          {errors.city && <div className="text-md text-red-600">{errors.city.message}</div>}
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            className="bg-white border border-gray-400 p-4"
            {...register("state", { required: "State is required" })}
          >
            <option value=""></option>
            <option value="TX">TX</option>
          </select>
          {errors.state && <div className="text-md text-red-600">{errors.state.message}</div>}
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            className="bg-white border border-gray-400 p-4"
            {...register("type", { required: "Type is required" })}
          >
            <option value=""></option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="Bagel">Bagel</option>
            <option value="Bar">Bar</option>
            <option value="BBQ">BBQ</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Burger">Burger</option>
            <option value="Cajun">Cajun</option>
            <option value="Food Court">Food Court</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Pizza">Pizza</option>
            <option value="Poke">Poke</option>
            <option value="Pub">Pub</option>
            <option value="Salad">Salad</option>
            <option value="Sandwhich">Sandwhich</option>
            <option value="Seafood">Seafood</option>
            <option value="Southwestern">Southwestern</option>
            <option value="Steakhouse">Steakhouse</option>
            <option value="Sushi">Sushi</option>
            <option value="Taco">Taco</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Winery">Winery</option>
            <option value="Wings">Wings</option>
          </select>
          {errors.type && <div className="text-md text-red-600">{errors.type.message}</div>}
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            className="bg-white border border-gray-400 p-4"
            {...register("rating")}
          >
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.rating && <div className="text-md text-red-600">{errors.rating.message}</div>}
          <label htmlFor="cost">Cost</label>
          <select
            id="cost"
            name="cost"
            className="bg-white border border-gray-400 p-4"
            {...register("cost", { required: "Cost is required" })}
          >
            <option value=""></option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
          {errors.cost && <div className="text-md text-red-600">{errors.cost.message}</div>}
          <label htmlFor="visited">Visited</label>
          <select
            id="visited"
            name="visited"
            className="bg-white border border-gray-400 p-4"
            {...register("visited", { required: "Visited is required" })}
          >
            <option value=""></option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {errors.visited && <div className="text-md text-red-600">{errors.visited.message}</div>}
        </div>
      </form>
      <button className="bg-slate-600 text-white p-4" onClick={handleOnCancel}>
        {isCanceling ? <DataUsageIcon fontSize="sm" className="animate-spin" /> : "Cancel"}
      </button>
      <button className="bg-sky-600 text-white p-4" onClick={handleSubmit(handleOnSubmit)}>
        {isSubmitting ? <DataUsageIcon fontSize="sm" className="animate-spin" /> : "Save"}
      </button>
    </>
  );
};

export default RestaurantForm;
