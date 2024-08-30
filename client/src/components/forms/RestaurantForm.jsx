//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import DataUsageIcon from "@mui/icons-material/DataUsage";

import * as Actions from "../../actions/actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useRestaurantsContext } from "../../hooks/useRestaurantsContext";

import {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../../api/restaurants";
import { CITIES, COST, RATING, TYPES } from "../../api/attributes";

import Button from "../../core/button/Button";
import MultiSelectInput from "../../core/multiSelectInput/MultiSelectInput";
import SelectInput from "../../core/selectInput/SelectInput";
import TextInput from "../../core/textInput/TextInput";

import DeleteModal from "../../components/modals/DeleteModal";

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

  const [locations, setLocations] = useState([]);

  const [isCanceling, setIsCanceling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setLocations([...data.locations.map((location) => location.city)]);
    }
  }, [data]);

  const handleOnSubmit = async (data) => {
    if (!user) {
      return;
    }

    const newRestaurant = {
      restaurant: data.restaurant,
      locations: locations.map((location) => ({ city: location, state: "TX" })),
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

  const handleOnDelete = async () => {
    setIsDeleting(true);

    const json = await deleteRestaurant(id, user.token);

    if (json.json) {
      dispatchRestaurants({ type: Actions.DELETE_RESTAURANT, payload: json.json });

      setDeleteModalOpen(false);

      navigate(-1);
    }
  };

  const handleOnCancel = () => {
    setIsCanceling(true);

    navigate(-1);
  };

  return (
    <>
      <DeleteModal
        open={deleteModalOpen}
        loading={isDeleting}
        onDeleteClick={handleOnDelete}
        onCancelClick={() => setDeleteModalOpen(false)}
      />
      <form>
        <div className="flex flex-col gap-4">
          <TextInput
            type="text"
            label="Restaurant"
            error={errors.restaurant && errors.restaurant.message}
            {...register("restaurant", { required: "Restaurant is required" })}
          />
          <MultiSelectInput
            values={CITIES}
            defaultValues={locations}
            onChange={(locations) => setLocations([...locations])}
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
      <Button variant="default" onClick={handleOnCancel}>
        {isCanceling ? <DataUsageIcon fontSize="lg" className="animate-spin" /> : "Cancel"}
      </Button>
      <Button variant="primary" onClick={handleSubmit(handleOnSubmit)}>
        {isSubmitting ? <DataUsageIcon fontSize="lg" className="animate-spin" /> : "Save"}
      </Button>
      {data && (
        <Button variant="error" onClick={() => setDeleteModalOpen(true)}>
          Delete
        </Button>
      )}
    </>
  );
};

export default RestaurantForm;
