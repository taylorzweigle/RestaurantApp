//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, FloatButton, Input, Tag, Typography } from "antd";

import { ArrowLeftOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

import LocationListItem from "../components/lists/LocationListItem";
import LocationsFilterModal from "../components/modals/LocationsFilterModal";
import NewLocationModal from "../components/modals/NewLocationModal";

import * as Actions from "../actions/actions";

import { getLocations } from "../api/locations";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLocationsContext } from "../hooks/useLocationsContext";

import { sortLocationsArray } from "../utility/Sort";

const LocationsPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { locations, dispatchLocations } = useLocationsContext();

  const [locationCategories, setLocationCategories] = useState([]);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [locationsFilterModal, setLocationsFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchLocations = async () => {
      const locations = await getLocations(user.token);

      dispatchLocations({ type: Actions.GET_LOCATIONS, payload: locations.json });

      if (locations) {
        const categories = locations.json.map((location) => location.category);

        setLocationCategories([...new Set(categories)].sort());
      }
    };

    if (user) {
      fetchLocations();
    }
  }, [dispatchLocations, user]);

  const handleLocationFilterSave = (category) => {
    setSelectedCategory(category);

    setLocationsFilterModal(false);
  };

  return (
    <>
      <NewLocationModal
        open={locationModalOpen}
        onSaveClick={() => setLocationModalOpen(false)}
        onCancelClick={() => setLocationModalOpen(false)}
      />
      <LocationsFilterModal
        open={locationsFilterModal}
        categories={locationCategories}
        onSaveClick={(category) => handleLocationFilterSave(category)}
        onCancelClick={() => setLocationsFilterModal(false)}
      />
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ width: "64px", height: "64px" }}
        onClick={() => setLocationModalOpen(true)}
      />
      <FloatButton.BackTop style={{ width: "64px", height: "64px", insetInlineEnd: 94 }} />
      <Flex vertical gap="middle" className="bg-neutral-100 dark:bg-neutral-950 min-h-screen p-3">
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
          <Flex justify="space-between" align="center" className="p-1">
            <Flex vertical className="p-1">
              <Typography.Text strong>{`${locations && locations.length} Locations`}</Typography.Text>
              <Typography.Text type="secondary">
                {`${
                  locations && [...new Set(locations.map((location) => location.category))].length
                } Categories`}
              </Typography.Text>
            </Flex>
            <Button type="text" size="large" onClick={() => setLocationsFilterModal(true)}>
              <Flex gap="small" align="center">
                <span>Filter:</span>
                <Tag className="me-0">{selectedCategory}</Tag>
              </Flex>
            </Button>
          </Flex>
          {locations &&
            sortLocationsArray(locations)
              .filter(
                (location) =>
                  location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  location.state.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .filter((location) =>
                selectedCategory === "All" ? location : location.category === selectedCategory
              )
              .map((location) => <LocationListItem key={location.city} location={location} />)}
        </Flex>
      </Flex>
    </>
  );
};

export default LocationsPage;
