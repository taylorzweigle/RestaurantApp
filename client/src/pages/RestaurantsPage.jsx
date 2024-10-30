//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Dropdown, Flex, FloatButton, Input, Skeleton, Typography } from "antd";

import { ArrowDownOutlined, MoreOutlined, PlusOutlined, SwapOutlined } from "@ant-design/icons";

import * as Actions from "../actions/actions";

import { getRestaurants } from "../api/restaurants";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import RestaurantListItem from "../components/lists/RestaurantListItem";
import LogoutModal from "../components/modals/LogoutModal";

const RestaurantsPage = () => {
  const { user } = useAuthContext();
  const logout = useLogout();
  const { restaurants, dispatchRestaurants } = useRestaurantsContext();

  const [loading, setLoading] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [logoutOpen, setLogoutOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);

      const restaurants = await getRestaurants(user.token);

      dispatchRestaurants({ type: Actions.GET_RESTAURANTS, payload: restaurants.json });

      setFilteredRestaurants(restaurants.json);

      setLoading(false);
    };

    if (user) {
      fetchRestaurants();
    }
  }, [dispatchRestaurants, user]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filtered = restaurants.filter((restaurant) =>
      restaurant.restaurant.toLowerCase().includes(e.target.value.toLowerCase())
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

  const items = [
    {
      key: "1",
      label: <div onClick={() => setLogoutOpen(true)}>Logout</div>,
    },
  ];

  return (
    <>
      <LogoutModal
        open={logoutOpen}
        onLogoutClick={() => logout()}
        onCancelClick={() => setLogoutOpen(false)}
      />
      <div className="min-h-screen bg-gray-100 p-4">
        <Flex vertical gap="middle">
          <Flex justify="space-between">
            <Typography.Title level={4}>Dallas - Fort Worth</Typography.Title>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button color="default" variant="text" shape="circle" icon={<MoreOutlined />} />
            </Dropdown>
          </Flex>
          <FloatButton icon={<PlusOutlined />} type="primary" onClick={() => navigate("/restaurant")} />
          <Input size="large" placeholder="Search" value={searchQuery} onChange={handleSearch} allowClear />
          <Flex justify="flex-end">
            <Button type="text" icon={<ArrowDownOutlined />}>
              Sort
            </Button>
            <Button type="text" icon={<SwapOutlined />}>
              Filter
            </Button>
          </Flex>
          <Flex vertical gap="middle">
            {loading
              ? renderSkeleton(7)
              : filteredRestaurants.map((restaurant) => (
                  <RestaurantListItem key={restaurant._id} restaurant={restaurant} />
                ))}
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default RestaurantsPage;
