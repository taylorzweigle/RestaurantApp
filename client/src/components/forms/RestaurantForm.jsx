//Taylor Zweigle, 2024
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import * as Actions from "../../actions/actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useRestaurantsContext } from "../../hooks/useRestaurantsContext";

import { getRestaurants, createRestaurant, updateRestaurant } from "../../api/restaurants";
import { CITIES, COST, RATING, TYPES } from "../../api/attributes";

import SelectInput from "../../core/selectInput/SelectInput";
import TextInput from "../../core/textInput/TextInput";

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
          locations: data.locations[0].city,
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
      locations: [{ city: data.locations, state: "TX" }],
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
      if (json.error.includes("locations")) {
        setError("locations", { message: "Location is required" });
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
        <div className="flex flex-col gap-4">
          <TextInput
            type="text"
            label="Restaurant"
            error={errors.restaurant && errors.restaurant.message}
            {...register("restaurant", { required: "Restaurant is required" })}
          />
          <SelectInput
            label="Location"
            options={CITIES}
            value={data && data.locations[0]}
            error={errors.locations && errors.locations.message}
            {...register("locations", { required: "Location is required" })}
          />
          <SelectInput
            label="Type"
            options={TYPES}
            value={data && data.type}
            error={errors.type && errors.type.message}
            {...register("type", { required: "Type is required" })}
          />
          <SelectInput
            label="Cost"
            options={COST}
            value={data && data.cost}
            error={errors.cost && errors.cost.message}
            {...register("cost", { required: "Cost is required" })}
          />
          <SelectInput
            label="Visited"
            options={["No", "Yes"]}
            value={data && data.visited}
            error={errors.visited && errors.visited.message}
            {...register("visited", { required: "Visited is required" })}
          />
          <SelectInput
            label="Rating"
            options={RATING}
            value={data && data.rating}
            {...register("rating")}
          />
        </div>
      </form>
      <button className="bg-slate-600 text-white p-4 rounded-full" onClick={handleOnCancel}>
        {isCanceling ? <DataUsageIcon fontSize="lg" className="animate-spin" /> : "Cancel"}
      </button>
      <button className="bg-sky-600 text-white p-4 rounded-full" onClick={handleSubmit(handleOnSubmit)}>
        {isSubmitting ? <DataUsageIcon fontSize="lg" className="animate-spin" /> : "Save"}
      </button>
    </>
  );
};

export default RestaurantForm;
