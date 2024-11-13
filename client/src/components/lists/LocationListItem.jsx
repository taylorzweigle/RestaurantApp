//Taylor Zweigle, 2024
import React, { useState } from "react";

import { Button, Flex, Typography } from "antd";

import { CloseOutlined } from "@ant-design/icons";

import DeleteLocationModal from "../modals/DeleteLocationModal";

import * as Actions from "../../actions/actions";

import { deleteLocation } from "../../api/locations";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocationsContext } from "../../hooks/useLocationsContext";

const LocationListItem = ({ location, onClick }) => {
  const { user } = useAuthContext();
  const { dispatchLocations } = useLocationsContext();

  const [deleteLocationModalOpen, setDeleteLocationModalOpen] = useState(false);

  const handleOnDelete = async (id) => {
    const json = await deleteLocation(id, user.token);

    if (json.json) {
      dispatchLocations({ type: Actions.DELETE_LOCATION, payload: json.json });

      setDeleteLocationModalOpen(false);
    }
  };

  return (
    <>
      <DeleteLocationModal
        open={deleteLocationModalOpen}
        onDeleteClick={() => handleOnDelete(location._id)}
        onCancelClick={() => setDeleteLocationModalOpen(false)}
      />
      <Flex
        justify="space-between"
        align="flex-start"
        className="bg-white p-3 rounded-xl drop-shadow"
        onClick={onClick}
      >
        <Flex vertical>
          <Typography.Title level={5} style={{ marginBottom: "0px", lineHeight: "normal" }}>
            {`${location.city}, ${location.state}`}
          </Typography.Title>
          <Typography.Text type="secondary">{location.category}</Typography.Text>
        </Flex>
        <Flex>
          <Button
            type="text"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={() => setDeleteLocationModalOpen(true)}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default LocationListItem;
