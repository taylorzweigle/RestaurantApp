//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, Form, Input, Spin, Typography } from "antd";

import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";

import * as Actions from "../actions/actions";

import { getLocations, createLocation } from "../api/locations";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLocationsContext } from "../hooks/useLocationsContext";

const LocationsPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { locations, dispatchLocations } = useLocationsContext();

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");

  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      const locations = await getLocations(user.token);

      dispatchLocations({ type: Actions.GET_LOCATIONS, payload: locations.json });
    };

    if (user) {
      fetchLocations();
    }
  }, [dispatchLocations, user]);

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

    const location = {
      city,
      state,
      category,
      creationTime: new Date(),
    };

    const json = await createLocation(location, user.token);

    if (json.error) {
      if (json.error.includes("city")) {
        setCityError("City is required");
      }
      if (json.error.includes("state")) {
        setStateError("State is required");
      }
      if (json.error.includes("category")) {
        setCategoryError("Category is required");
      }

      setIsSubmitting(false);
    }

    if (json.json) {
      dispatchLocations({ type: Actions.CREATE_LOCATION, payload: json.json });

      clearForm();

      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setCity("");
    setState("");
    setCategory("");
  };

  const clearErrors = () => {
    setCityError("");
    setStateError("");
    setCategoryError("");
  };

  return (
    <Flex vertical gap="middle" className="p-3">
      <Flex justify="space-between" align="center">
        <Button
          color="default"
          variant="filled"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <Typography.Title level={4}>Locations</Typography.Title>
        <span className="w-8">&nbsp;</span>
      </Flex>
      <Form>
        <Flex vertical gap="middle">
          <Flex vertical>
            <Form.Item
              label="City"
              required
              style={{ marginBottom: "0px" }}
              validateStatus={cityError ? "error" : null}
            >
              <Input value={city} size="large" onChange={(e) => setCity(e.target.value)} />
            </Form.Item>
            {cityError && <Typography.Text type="danger">{cityError}</Typography.Text>}
          </Flex>
          <Flex vertical>
            <Form.Item
              label="State/Country"
              required
              style={{ marginBottom: "0px" }}
              validateStatus={stateError ? "error" : null}
            >
              <Input value={state} size="large" onChange={(e) => setState(e.target.value)} />
            </Form.Item>
            {stateError && <Typography.Text type="danger">{stateError}</Typography.Text>}
          </Flex>
          <Flex vertical>
            <Form.Item
              label="Category"
              required
              style={{ marginBottom: "0px" }}
              validateStatus={categoryError ? "error" : null}
            >
              <Input value={category} size="large" onChange={(e) => setCategory(e.target.value)} />
            </Form.Item>
            {categoryError && <Typography.Text type="danger">{categoryError}</Typography.Text>}
          </Flex>
        </Flex>
      </Form>
      <Button color="primary" variant="solid" size="large" onClick={handleOnSubmit}>
        {isSubmitting ? <Spin indicator={<LoadingOutlined spin style={{ color: "white" }} />} /> : "Save"}
      </Button>
      {locations &&
        locations.map((location) => (
          <Flex vertical key={location.city}>
            <Typography.Text>{`${location.city}, ${location.state}`}</Typography.Text>
            <Typography.Text type="secondary">{location.category}</Typography.Text>
          </Flex>
        ))}
    </Flex>
  );
};

export default LocationsPage;
