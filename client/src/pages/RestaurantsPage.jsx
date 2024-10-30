//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Dropdown, Flex, FloatButton, Input, Skeleton, Typography } from "antd";

import {
  CaretDownOutlined,
  ControlOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import * as Actions from "../actions/actions";

import { getRestaurants } from "../api/restaurants";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import RestaurantListItem from "../components/lists/RestaurantListItem";
import LogoutModal from "../components/modals/LogoutModal";

const RestaurantsPage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
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

  const renderTitle = () => {
    const items = [
      {
        key: "1",
        label: <div>Dallas - Fort Worth</div>,
      },
    ];

    return (
      <Flex className="pl-1">
        <Typography.Title level={4}>Dallas - Fort Worth</Typography.Title>
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
        label: <div onClick={() => setLogoutOpen(true)}>Logout</div>,
      },
    ];

    return (
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button color="default" variant="text" shape="circle" icon={<MoreOutlined />} />
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
      <div className="min-h-screen bg-gray-100 p-4">
        <Flex vertical gap="middle">
          <Flex justify="space-between">
            {renderTitle()}
            {renderMenu()}
          </Flex>
          <FloatButton icon={<PlusOutlined />} type="primary" onClick={() => navigate("/restaurant")} />
          <Input
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={handleSearch}
            allowClear
          />
          <Flex justify="space-between" align="center" className="pl-2">
            <Flex vertical>
              <Typography.Text strong>{`${filteredRestaurants.length} Restaurants`}</Typography.Text>
              <Typography.Text type="secondary">{`${
                filteredRestaurants.filter((r) => !r.visited).length
              } Todo`}</Typography.Text>
            </Flex>
            <Button type="text" icon={<ControlOutlined />}>
              Filter
            </Button>
          </Flex>
          <Flex vertical gap="small">
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
