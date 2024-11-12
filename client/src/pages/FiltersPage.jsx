//Taylor Zweigle, 2024
import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Divider, Flex, Typography } from "antd";

import { ArrowLeftOutlined, UndoOutlined } from "@ant-design/icons";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import StarHalf from "@mui/icons-material/StarHalf";

import { useLocationsContext } from "../hooks/useLocationsContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { COST, RATING, TYPES } from "../api/attributes";

import FilterCard from "../components/cards/FilterCard";

const FiltersPage = () => {
  const navigate = useNavigate();

  const { locations } = useLocationsContext();
  const { restaurants } = useRestaurantsContext();

  const getCityCount = (city) => {
    let count = 0;

    for (let i = 0; i < restaurants.length; i++) {
      for (let j = 0; j < restaurants[i].locations.length; j++) {
        if (restaurants[i].locations[j].city === city) {
          count = count + 1;
        }
      }
    }

    return count;
  };

  const renderStars = (rating) => {
    let stars = [];

    for (let i = 0; i < parseInt(rating); i++) {
      stars.push(<StarIcon key={i} fontSize="xsmall" className="text-amber-500" />);
    }

    if (parseFloat(rating) % 1 !== 0) {
      stars.push(<StarHalf key={rating} fontSize="xsmall" className="text-amber-500" />);
    }

    return stars;
  };

  return (
    <Flex vertical gap="middle" className="bg-gray-100 p-3">
      <Flex justify="space-between" align="center">
        <Button
          color="default"
          variant="text"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <Typography.Title level={4}>Filters</Typography.Title>
        <Button
          color="default"
          variant="text"
          shape="circle"
          size="large"
          icon={<UndoOutlined />}
          onClick={() => navigate(-1)}
        />
      </Flex>
      {restaurants && (
        <Flex vertical gap="middle">
          <Flex vertical gap="none">
            <Divider>
              <Typography.Text strong>Restaurants</Typography.Text>
            </Divider>
            <Flex wrap gap="small">
              <FilterCard attribute="All" query="All" label="All" value={restaurants.length} />
              <FilterCard
                attribute="Visited"
                query="Visited"
                label="Visited"
                value={restaurants.filter((restaurant) => restaurant.visited).length}
              />
              <FilterCard
                attribute="To Visit"
                query="To Visit"
                label="To Visit"
                value={restaurants.filter((restaurant) => !restaurant.visited).length}
              />
            </Flex>
          </Flex>
          <Flex vertical gap="none">
            <Divider>
              <Typography.Text strong>Cities</Typography.Text>
            </Divider>
            <Flex wrap gap="small">
              {locations
                .sort(function (a, b) {
                  if (a.city < b.city) {
                    return -1;
                  }
                  if (a.city > b.city) {
                    return 1;
                  }
                  return 0;
                })
                .filter((location) => location.category === null)
                .map((location) => {
                  return {
                    value: location.city,
                    label: location.city,
                  };
                })
                .map((city) => (
                  <FilterCard
                    key={city.value}
                    attribute="Locations"
                    query={city.value}
                    label={city.value}
                    value={getCityCount(city.value)}
                  />
                ))}
            </Flex>
          </Flex>
          <Flex vertical gap="none">
            <Divider>
              <Typography.Text strong>Type</Typography.Text>
            </Divider>
            <Flex wrap gap="small">
              {TYPES.map((type) => (
                <FilterCard
                  key={type.value}
                  attribute="Type"
                  query={type.value}
                  label={type.value}
                  value={restaurants.filter((restaurant) => restaurant.type === type.value).length}
                />
              ))}
            </Flex>
          </Flex>
          <Flex vertical gap="none">
            <Divider>
              <Typography.Text strong>Rating</Typography.Text>
            </Divider>
            <Flex wrap gap="small">
              {RATING.map((rating) => (
                <FilterCard
                  key={rating.value}
                  attribute="Rating"
                  query={rating.value}
                  label={renderStars(rating.value)}
                  value={
                    restaurants.filter(
                      (restaurant) =>
                        (
                          (parseInt(restaurant.rating.husband) + parseInt(restaurant.rating.wife)) /
                          2
                        ).toString() === rating.value
                    ).length
                  }
                />
              ))}
            </Flex>
          </Flex>
          <Flex vertical gap="none">
            <Divider>
              <Typography.Text strong>Cost</Typography.Text>
            </Divider>
            <Flex wrap gap="small">
              {COST.map((cost) => (
                <FilterCard
                  key={cost.value}
                  attribute="Cost"
                  query={cost.value}
                  label={Array.apply(null, Array(cost.value.length))
                    .map((x, i) => i + 1)
                    .map((cost) => (
                      <AttachMoneyIcon key={cost} fontSize="xsmall" className="text-teal-600 -ml-1" />
                    ))}
                  value={restaurants.filter((restaurant) => restaurant.cost === cost.value).length}
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default FiltersPage;
