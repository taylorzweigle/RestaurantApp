//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { Button, Form, Input, Select, Spin, Typography } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

import DeleteModal from "../../components/modals/DeleteModal";

import * as Actions from "../../actions/actions";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useRestaurantsContext } from "../../hooks/useRestaurantsContext";

import {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../../api/restaurants";

import { CITIES, COST, RATING, TYPES, VISITED } from "../../api/attributes";

const RestaurantForm = ({ id, data, edit }) => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { dispatchRestaurants } = useRestaurantsContext();

  const [restaurant, setRestaurant] = useState("");
  const [locations, setLocations] = useState(null);
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");
  const [visited, setVisited] = useState("");
  const [rating, setRating] = useState("");

  const [restaurantError, setRestaurantError] = useState("");
  const [locationsError, setLocationsError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [costError, setCostError] = useState("");
  const [visitedError, setVisitedError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setRestaurant(data.restaurant);
      setLocations(data.locations.map((location) => location.city));
      setType(data.type);
      setRating(data.rating);
      setCost(data.cost);
      setVisited(data.visited);
    }
  }, [data]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (!user) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    clearErrors();

    const newRestaurant = {
      restaurant: restaurant,
      locations: locations && locations.map((location) => ({ city: location, state: "TX" })),
      type: type,
      rating: rating,
      cost: cost,
      visited: visited === "Yes" ? true : visited === "No" ? false : null,
      creationTime: new Date(),
    };

    const json = edit
      ? await updateRestaurant(id, newRestaurant, user.token)
      : await createRestaurant(newRestaurant, user.token);

    if (json.error) {
      if (json.error.includes("restaurant")) {
        setRestaurantError("Restaurant is required");
      }
      if (json.error.includes("locations")) {
        setLocationsError("Location is required");
      }
      if (json.error.includes("type")) {
        setTypeError("Type is required");
      }
      if (json.error.includes("cost")) {
        setCostError("Cost is required");
      }
      if (json.error.includes("visited")) {
        setVisitedError("Visited is required");
      }

      setIsSubmitting(false);
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

      clearForm();
    }
  };

  const clearForm = () => {
    setRestaurant("");
    setLocations(null);
    setType("");
    setCost("");
    setVisited("");
    setRating("");
  };

  const clearErrors = () => {
    setRestaurantError("");
    setLocationsError("");
    setTypeError("");
    setCostError("");
    setVisitedError("");
  };

  const handleOnDelete = async () => {
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
        onDeleteClick={handleOnDelete}
        onCancelClick={() => setDeleteModalOpen(false)}
      />
      <Form>
        <Form.Item
          label="Restaurant"
          required
          style={{ marginBottom: "0px" }}
          validateStatus={restaurantError ? "error" : null}
        >
          <Input value={restaurant} onChange={(e) => setRestaurant(e.target.value)} />
        </Form.Item>
        {restaurantError && <Typography.Text type="danger">{restaurantError}</Typography.Text>}
        <Form.Item
          label="Location"
          required
          style={{ marginBottom: "0px" }}
          validateStatus={locationsError ? "error" : null}
        >
          <Select
            options={CITIES}
            mode="multiple"
            value={locations}
            onChange={(value) => setLocations(value)}
          />
        </Form.Item>
        {locationsError && <Typography.Text type="danger">{locationsError}</Typography.Text>}
        <Form.Item
          label="Type"
          required
          style={{ marginBottom: "0px" }}
          validateStatus={typeError ? "error" : null}
        >
          <Select options={TYPES} value={type} onChange={(value) => setType(value)} />
        </Form.Item>
        {typeError && <Typography.Text type="danger">{typeError}</Typography.Text>}
        <Form.Item
          label="Cost"
          required
          style={{ marginBottom: "0px" }}
          validateStatus={costError ? "error" : null}
        >
          <Select options={COST} value={cost} onChange={(value) => setCost(value)} />
        </Form.Item>
        {costError && <Typography.Text type="danger">{costError}</Typography.Text>}
        <Form.Item
          label="Visited"
          required
          style={{ marginBottom: "0px" }}
          validateStatus={visitedError ? "error" : null}
        >
          <Select options={VISITED} value={visited} onChange={(value) => setVisited(value)} />
        </Form.Item>
        {visitedError && <Typography.Text type="danger">{visitedError}</Typography.Text>}
        <Form.Item label="Rating" style={{ marginBottom: "0px" }}>
          <Select options={RATING} value={rating} onChange={(value) => setRating(value)} />
        </Form.Item>
      </Form>
      <Button color="default" variant="filled" onClick={handleOnCancel}>
        {isCanceling ? <Spin indicator={<LoadingOutlined spin />} /> : "Cancel"}
      </Button>
      <Button color="primary" variant="solid" onClick={handleOnSubmit}>
        {isSubmitting ? <Spin indicator={<LoadingOutlined spin style={{ color: "white" }} />} /> : "Save"}
      </Button>
      {data && (
        <Button color="danger" variant="solid" onClick={() => setDeleteModalOpen(true)}>
          Delete
        </Button>
      )}
    </>
  );
};

export default RestaurantForm;
