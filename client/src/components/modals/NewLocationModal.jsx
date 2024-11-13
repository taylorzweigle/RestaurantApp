//Taylor Zweigle, 2024
import React, { useState } from "react";

import { Flex, Form, Input, Modal, Typography } from "antd";

import * as Actions from "../../actions/actions";

import { createLocation } from "../../api/locations";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocationsContext } from "../../hooks/useLocationsContext";

const NewLocationModal = ({ open, onSaveClick, onCancelClick }) => {
  const { user } = useAuthContext();
  const { dispatchLocations } = useLocationsContext();

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");

  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
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
    }

    if (json.json) {
      dispatchLocations({ type: Actions.CREATE_LOCATION, payload: json.json });

      clearForm();
    }

    onSaveClick();
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
    <Modal title="New Location" open={open} onOk={handleOnSubmit} onCancel={onCancelClick}>
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
    </Modal>
  );
};

export default NewLocationModal;
