//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, Dropdown, Empty, Flex, FloatButton, Input, Skeleton, Tag, Typography } from "antd";

import {
  CaretDownOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";

import * as Actions from "../actions/actions";

import { getRestaurants } from "../api/restaurants";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useLocationsContext } from "../hooks/useLocationsContext";
import { useLocationCategoryContext } from "../hooks/useLocationCategoryContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import RestaurantListItem from "../components/lists/RestaurantListItem";
import LogoutModal from "../components/modals/LogoutModal";
import { getLocations } from "../api/locations";

const RestaurantsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { dispatchLocations } = useLocationsContext();
  const { category, dispatchCategory } = useLocationCategoryContext();
  const { restaurants, dispatchRestaurants } = useRestaurantsContext();

  const [loading, setLoading] = useState(true);
  const [locationCategories, setLocationCategories] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);

      const restaurants = await getRestaurants(user.token);

      dispatchRestaurants({ type: Actions.GET_RESTAURANTS, payload: restaurants.json });

      setFilteredRestaurants(
        restaurants.json.filter((restaurant) => restaurant.locationCategory === category)
      );

      setLoading(false);
    };

    if (user) {
      fetchRestaurants();
    }
  }, [dispatchRestaurants, category, user]);

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

  useEffect(() => {
    if (restaurants) {
      switch (searchParams.get("attribute")) {
        case "Visited":
          setFilteredRestaurants(
            restaurants.filter(
              (restaurant) => restaurant.visited === true && restaurant.locationCategory === category
            )
          );
          break;
        case "To Visit":
          setFilteredRestaurants(
            restaurants.filter(
              (restaurant) => restaurant.visited === false && restaurant.locationCategory === category
            )
          );
          break;
        case "Locations":
          let filtered = [];

          for (let i = 0; i < restaurants.length; i++) {
            for (let j = 0; j < restaurants[i].locations.length; j++) {
              if (
                restaurants[i].locations[j].city === searchParams.get("query") &&
                restaurants[i].locationCategory === category
              ) {
                filtered.push(restaurants[i]);
              }
            }
          }

          setFilteredRestaurants(filtered);
          break;
        case "Type":
          setFilteredRestaurants(
            restaurants.filter(
              (restaurant) =>
                restaurant.type === searchParams.get("query") && restaurant.locationCategory === category
            )
          );
          break;
        case "Rating":
          setFilteredRestaurants(
            restaurants.filter(
              (restaurant) =>
                restaurant.rating === searchParams.get("query") && restaurant.locationCategory === category
            )
          );
          break;
        case "Cost":
          setFilteredRestaurants(
            restaurants.filter(
              (restaurant) =>
                restaurant.cost === searchParams.get("query") && restaurant.locationCategory === category
            )
          );
          break;
        default:
          setFilteredRestaurants(
            restaurants.filter((restaurant) => restaurant.locationCategory === category)
          );
          break;
      }
    }
  }, [restaurants, category, searchParams]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.restaurant.toLowerCase().includes(e.target.value.toLowerCase()) &&
        restaurant.locationCategory === category
    );

    setFilteredRestaurants(filtered);
  };

  const renderSkeleton = (count) => {
    const skeleton = [];

    for (let i = 0; i < count; i++) {
      skeleton.push(<Skeleton.Node key={i} loading={loading} active={true} style={{ width: "100%" }} />);
    }

    return skeleton;
  };

  const renderTitle = () => {
    const items =
      locationCategories &&
      locationCategories.map((location) => {
        return {
          key: location,
          label: (
            <div
              onClick={() => dispatchCategory({ type: Actions.SET_LOCATION_CATEGORY, payload: location })}
            >
              {location}
            </div>
          ),
        };
      });

    return (
      <Flex className="pl-1">
        <Typography.Title level={3}>{category}</Typography.Title>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button color="default" variant="text" shape="circle" icon={<CaretDownOutlined />} />
        </Dropdown>
      </Flex>
    );
  };

  const renderMenu = () => {
    const items = [
      {
        key: "1",
        label: <div onClick={() => navigate("/locations")}>Locations</div>,
      },
      {
        key: "2",
        label: <div onClick={() => setLogoutOpen(true)}>Logout</div>,
      },
    ];

    return (
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button color="default" variant="text" size="large" shape="circle" icon={<MoreOutlined />} />
      </Dropdown>
    );
  };

  return (
    <>
      <LogoutModal
        open={logoutOpen}
        onLogoutClick={() => logout()}
        onCancelClick={() => setLogoutOpen(false)}
      />
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ width: "64px", height: "64px" }}
        onClick={() => navigate("/restaurant")}
      />
      <FloatButton.BackTop style={{ width: "56px", height: "56px", insetInlineEnd: 94 }} />
      <div className="min-h-screen bg-gray-100 p-3">
        <Flex vertical gap="small">
          <Flex justify="space-between">
            {renderTitle()}
            {renderMenu()}
          </Flex>
          <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={handleSearch}
            allowClear
          />
          <Flex justify="space-between" align="center" className="p-1">
            <Flex vertical>
              <Typography.Text strong>{`${filteredRestaurants.length} Restaurants`}</Typography.Text>
              <Typography.Text type="secondary">
                {`${filteredRestaurants.filter((r) => !r.visited).length} Todo`}
              </Typography.Text>
            </Flex>
            <Button type="text" size="large" onClick={() => navigate("/filters")}>
              <Flex gap="small" align="center">
                <span>Filter:</span>
                <Tag
                  style={{ marginInlineEnd: "0px" }}
                  icon={searchParams.get("attribute") === "Rating" && <StarFilled />}
                >
                  {searchParams.get("query") !== null ? searchParams.get("query") : "All"}
                </Tag>
              </Flex>
            </Button>
          </Flex>
          <Flex vertical gap="small">
            {loading ? (
              renderSkeleton(7)
            ) : filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <RestaurantListItem key={restaurant._id} restaurant={restaurant} />
              ))
            ) : (
              <Empty />
            )}
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default RestaurantsPage;
