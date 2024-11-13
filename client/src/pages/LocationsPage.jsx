//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, FloatButton, Input, Typography } from "antd";

import { ArrowLeftOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

import LocationListItem from "../components/lists/LocationListItem";
import NewLocationModal from "../components/modals/NewLocationModal";

import * as Actions from "../actions/actions";

import { getLocations } from "../api/locations";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLocationsContext } from "../hooks/useLocationsContext";

const LocationsPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { locations, dispatchLocations } = useLocationsContext();

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      const locations = await getLocations(user.token);

      dispatchLocations({ type: Actions.GET_LOCATIONS, payload: locations.json });
    };

    if (user) {
      fetchLocations();
    }
  }, [dispatchLocations, user]);

  return (
    <>
      <NewLocationModal
        open={locationModalOpen}
        onSaveClick={() => setLocationModalOpen(false)}
        onCancelClick={() => setLocationModalOpen(false)}
      />
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ width: "64px", height: "64px" }}
        onClick={() => setLocationModalOpen(true)}
      />
      <FloatButton.BackTop style={{ width: "64px", height: "64px", insetInlineEnd: 94 }} />
      <Flex vertical gap="middle" className="bg-gray-100 min-h-screen p-3">
        <Flex justify="space-between" align="center">
          <Button
            color="default"
            type="text"
            shape="circle"
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
          <Typography.Title level={4}>Locations</Typography.Title>
          <span className="w-8">&nbsp;</span>
        </Flex>
        <Flex vertical gap="small">
          <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
          {locations &&
            locations
              .sort(function (a, b) {
                if (a.city < b.city) {
                  return -1;
                }
                if (a.city > b.city) {
                  return 1;
                }
                return 0;
              })
              .filter(
                (location) =>
                  location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  location.state.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((location) => <LocationListItem key={location.city} location={location} />)}
        </Flex>
      </Flex>
    </>
  );
};

export default LocationsPage;
