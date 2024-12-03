//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Button, Dropdown, Empty, Flex, FloatButton, Input, Skeleton, Tag, Typography } from "antd";

import {
  CaretDownOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";

import * as Actions from "../actions/actions";

import { getLocations } from "../api/locations";
import { getRestaurants } from "../api/restaurants";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLocationsContext } from "../hooks/useLocationsContext";
import { useLogout } from "../hooks/useLogout";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import RestaurantListItem from "../components/lists/RestaurantListItem";
import LogoutModal from "../components/modals/LogoutModal";

const RestaurantsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const { user } = useAuthContext();
  const [storageTheme, setStorageTheme] = useLocalStorage("theme", "dark");
  const { dispatchLocations } = useLocationsContext();
  const { logout } = useLogout();
  const { restaurants, dispatchRestaurants } = useRestaurantsContext();

  const [loading, setLoading] = useState(false);
  const [locationCategories, setLocationCategories] = useState([]);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);

      const restaurants = await getRestaurants(user.token, params.category);

      dispatchRestaurants({ type: Actions.GET_RESTAURANTS, payload: restaurants.json });

      setLoading(false);
    };

    if (user) {
      fetchRestaurants();
    }
  }, [dispatchRestaurants, user, params]);

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

  const handleThemeButton = () => {
    setStorageTheme(storageTheme === "dark" ? "light" : "dark");

    document.documentElement.classList.toggle("dark");
  };

  const filterRestaurants = () => {
    if (restaurants) {
      switch (searchParams.get("attribute")) {
        case "Visited":
          return restaurants.filter((restaurant) => restaurant.visited === true);
        case "To Visit":
          return restaurants.filter((restaurant) => restaurant.visited === false);
        case "Locations":
          let filtered = [];

          for (let i = 0; i < restaurants.length; i++) {
            for (let j = 0; j < restaurants[i].locations.length; j++) {
              if (restaurants[i].locations[j].city === searchParams.get("query")) {
                filtered.push(restaurants[i]);
              }
            }
          }

          return filtered;
        case "Type":
          return restaurants.filter((restaurant) => restaurant.type === searchParams.get("query"));
        case "Rating":
          return restaurants.filter(
            (restaurant) =>
              ((parseInt(restaurant.rating.husband) + parseInt(restaurant.rating.wife)) / 2).toString() ===
              searchParams.get("query")
          );
        case "Cost":
          return restaurants.filter((restaurant) => restaurant.cost === searchParams.get("query"));
        default:
          return restaurants;
      }
    }
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
          label: <div onClick={() => navigate(`/restaurants/${location}`)}>{location}</div>,
        };
      });

    return (
      <Flex className="pl-1">
        <Typography.Title level={3}>{params.category}</Typography.Title>
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
        label: (
          <div onClick={handleThemeButton}>{`Set ${storageTheme === "dark" ? "Light" : "Dark"} Theme`}</div>
        ),
      },
      {
        key: "3",
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
        onClick={() => navigate(`/restaurants/${params.category}/create`)}
      />
      <FloatButton.BackTop style={{ width: "64px", height: "64px", insetInlineEnd: 94 }} />
      <div className="min-h-screen bg-stone-100 dark:bg-stone-950 p-3">
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
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
          <Flex justify="space-between" align="center" className="p-1">
            <Flex vertical>
              <Typography.Text strong>
                {loading ? (
                  <Skeleton.Button />
                ) : (
                  `${restaurants && filterRestaurants(restaurants).length} Restaurants`
                )}
              </Typography.Text>
              <Typography.Text type="secondary">
                {!loading &&
                  `${restaurants && filterRestaurants(restaurants).filter((r) => !r.visited).length} Todo`}
              </Typography.Text>
            </Flex>
            <Button type="text" size="large" onClick={() => navigate(`/${params.category}/filters`)}>
              <Flex gap="small" align="center">
                <span>Filter:</span>
                <Tag className="me-0" icon={searchParams.get("attribute") === "Rating" && <StarFilled />}>
                  {searchParams.get("query") !== null ? searchParams.get("query") : "All"}
                </Tag>
              </Flex>
            </Button>
          </Flex>
          <Flex vertical gap="small">
            {loading ? (
              renderSkeleton(7)
            ) : restaurants && restaurants.length > 0 ? (
              filterRestaurants(restaurants)
                .filter((restaurant) =>
                  restaurant.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((restaurant) => (
                  <RestaurantListItem
                    key={restaurant._id}
                    category={params.category}
                    restaurant={restaurant}
                  />
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
