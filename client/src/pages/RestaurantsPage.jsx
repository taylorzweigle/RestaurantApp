//Taylor Zweigle, 2025
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Button, Dropdown, Empty, Flex, FloatButton, Input, Skeleton, Tag, Typography } from "antd";

import {
  CaretDownOutlined,
  HomeOutlined,
  MoreOutlined,
  PlusOutlined,
  QuestionOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";

import * as Actions from "../actions/actions";

import { getLocations } from "../api/locations";
import { getRestaurants } from "../api/restaurants";

import { useAuthContext } from "../hooks/useAuthContext";
import { useCurrentLocationContext } from "../hooks/useCurrentLocationContext";
import { useFiltersContext } from "../hooks/useFiltersContext";
import { useLocationsContext } from "../hooks/useLocationsContext";
import { useLogout } from "../hooks/useLogout";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";
import { useThemeContext } from "../hooks/useThemeContext";

import RestaurantListItem from "../components/lists/RestaurantListItem";
import CurrentLocationModal from "../components/modals/CurrentLocationModal";
import LogoutModal from "../components/modals/LogoutModal";
import RandomRestaurantModal from "../components/modals/RandomRestaurantModal";

const RestaurantsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const { user } = useAuthContext();
  const { currentLocation, dispatchCurrentLocation } = useCurrentLocationContext();
  const { dispatchFilters } = useFiltersContext();
  const { dispatchLocations } = useLocationsContext();
  const { logout } = useLogout();
  const { dispatchRestaurants } = useRestaurantsContext();
  const { theme, dispatchTheme } = useThemeContext();

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationCategories, setLocationCategories] = useState([]);
  const [currentLocationOpen, setCurrentLocationOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [randomModalOpen, setRandomModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);

      const restaurants = await getRestaurants(user.token, params.category);

      dispatchRestaurants({ type: Actions.GET_RESTAURANTS, payload: restaurants.json });

      if (restaurants.json) {
        let filteredRestaurants = [];

        const attributes = searchParams.getAll("attribute");
        const queries = searchParams.getAll("query");

        const filters = attributes
          .map((attribute, index) => ({
            attribute,
            query: queries[index],
          }))
          .reduce((acc, filter) => {
            const { attribute, query } = filter;

            if (!acc[attribute]) {
              acc[attribute] = [];
            }

            acc[attribute].push(query);

            return acc;
          }, {});

        if (Object.keys(filters).length === 0) {
          filteredRestaurants = [...restaurants.json];
        } else {
          for (let i = 0; i < restaurants.json.length; i++) {
            let addVisited = false;
            let addLocation = false;
            let addType = false;
            let addRating = false;
            let addCost = false;

            if (filters.Visited && filters.Visited.length > 0) {
              for (let j = 0; j < filters.Visited.length; j++) {
                let visited = false;

                if (filters.Visited[j] === "Visited") {
                  visited = true;
                } else if (filters.Visited[j] === "To Visit") {
                  visited = false;
                }

                if (restaurants.json[i].visited === visited) {
                  addVisited = true;
                }
              }
            } else {
              addVisited = true;
            }

            if (filters.Locations && filters.Locations.length > 0) {
              for (let j = 0; j < filters.Locations.length; j++) {
                if (restaurants.json[i].locations.some((l) => l.city === filters.Locations[j])) {
                  addLocation = true;
                }
              }
            } else {
              addLocation = true;
            }

            if (filters.Type && filters.Type.length > 0) {
              for (let j = 0; j < filters.Type.length; j++) {
                if (restaurants.json[i].type === filters.Type[j]) {
                  addType = true;
                }
              }
            } else {
              addType = true;
            }

            if (filters.Rating && filters.Rating.length > 0) {
              for (let j = 0; j < filters.Rating.length; j++) {
                if (
                  (
                    (parseInt(restaurants.json[i].rating.husband) +
                      parseInt(restaurants.json[i].rating.wife)) /
                    2
                  ).toString() === filters.Rating[j]
                ) {
                  addRating = true;
                }
              }
            } else {
              addRating = true;
            }

            if (filters.Cost && filters.Cost.length > 0) {
              for (let j = 0; j < filters.Cost.length; j++) {
                if (restaurants.json[i].cost === filters.Cost[j]) {
                  addCost = true;
                }
              }
            } else {
              addCost = true;
            }

            if (addVisited && addLocation && addType && addRating && addCost) {
              filteredRestaurants.push(restaurants.json[i]);
            }
          }
        }

        setFilteredRestaurants(filteredRestaurants);
      }

      setLoading(false);
    };

    if (user) {
      fetchRestaurants();
    }
  }, [dispatchRestaurants, user, params, searchParams]);

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

  const handleLocationChange = (location) => {
    navigate(`/restaurants/${location}`);

    dispatchFilters({ type: Actions.RESET_FILTERS });
  };

  const handleCurrentLocationModalClick = (value) => {
    dispatchCurrentLocation({ type: Actions.SET_CURRENT_LOCATION, payload: value });

    navigate(`/restaurants/${value}`);

    setCurrentLocationOpen(false);
  };

  const handleThemeButton = () => {
    dispatchTheme({ type: Actions.SET_THEME, payload: theme === "dark" ? "light" : "dark" });

    document.documentElement.classList.toggle("dark");
  };

  const handleOnFiltersClick = () => {
    navigate(`/${params.category}/filters`);
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
          label: <div onClick={() => handleLocationChange(location)}>{location}</div>,
          icon: location === currentLocation && (
            <Tag color="blue">
              <HomeOutlined />
            </Tag>
          ),
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
        type: "divider",
      },
      {
        key: "2",
        label: <div onClick={() => setCurrentLocationOpen(true)}>Set Current Location</div>,
      },
      {
        key: "3",
        label: <div onClick={handleThemeButton}>{`Set ${theme === "dark" ? "Light" : "Dark"} Theme`}</div>,
      },
      {
        type: "divider",
      },
      {
        key: "4",
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
      <CurrentLocationModal
        open={currentLocationOpen}
        onSaveClick={(value) => handleCurrentLocationModalClick(value)}
        onCancelClick={() => setCurrentLocationOpen(false)}
      />
      <RandomRestaurantModal
        open={randomModalOpen}
        restaurants={filteredRestaurants}
        onCancelClick={() => setRandomModalOpen(false)}
      />
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
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 p-3">
        <Flex vertical gap="small">
          <Flex justify="space-between">
            {renderTitle()}
            {renderMenu()}
          </Flex>
          <Flex gap="small">
            <Button
              type="primary"
              size="large"
              icon={<QuestionOutlined />}
              onClick={() => setRandomModalOpen(true)}
            />
            <Input
              size="large"
              placeholder="Search"
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </Flex>
          <Flex justify="space-between" align="center" className="p-1">
            <Flex vertical>
              <Typography.Text strong>
                {loading ? (
                  <Skeleton.Button />
                ) : (
                  `${filteredRestaurants && filteredRestaurants.length} Restaurants`
                )}
              </Typography.Text>
              <Typography.Text type="secondary">
                {!loading &&
                  `${filteredRestaurants && filteredRestaurants.filter((r) => !r.visited).length} Todo`}
              </Typography.Text>
            </Flex>
            <Button type="text" size="large" onClick={handleOnFiltersClick}>
              <Flex gap="small" align="center">
                <span>Filter:</span>
                {searchParams.getAll("attribute").length === 1 ? (
                  <Tag className="me-0" icon={searchParams.get("attribute") === "Rating" && <StarFilled />}>
                    {searchParams.get("query") !== null ? searchParams.get("query") : "All"}
                  </Tag>
                ) : (
                  <Tag className="me-0">
                    {searchParams.getAll("attribute").length === 0
                      ? "All"
                      : `${searchParams.getAll("attribute").length} Applied`}
                  </Tag>
                )}
              </Flex>
            </Button>
          </Flex>
          <Flex vertical gap="small">
            {loading ? (
              renderSkeleton(7)
            ) : filteredRestaurants && filteredRestaurants.length > 0 ? (
              filteredRestaurants
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
