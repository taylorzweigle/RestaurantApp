//Taylor Zweigle, 2024
import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Button, Collapse, Flex, List, Typography } from "antd";

import { ArrowLeftOutlined, UndoOutlined } from "@ant-design/icons";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import StarHalf from "@mui/icons-material/StarHalf";

import { useLocationsContext } from "../hooks/useLocationsContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { COST, RATING, TYPES } from "../api/attributes";

import FilterListItem from "../components/lists/FilterListItem";

const FiltersPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams({ attribute: "", query: "" });

  const { locations } = useLocationsContext();
  const { restaurants } = useRestaurantsContext();

  const [selected, setSelected] = useState("");
  const [attribute, setAttribute] = useState("");
  const [query, setQuery] = useState("");

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

  const handleOnClick = ({ label, attribute, query }) => {
    setSelected(label);
    setAttribute(attribute);
    setQuery(query);
  };

  const handleOnApply = () => {
    searchParams.set("attribute", attribute);
    searchParams.set("query", query);

    attribute === "All"
      ? navigate(`/restaurants/${params.category}`)
      : navigate(`/restaurants/${params.category}/?attribute=${attribute}&query=${query}`);
  };

  const items = [
    {
      key: "1",
      label: "Restaurants",
      children: (
        <Flex wrap gap="small">
          <List size="small" className="w-full">
            <FilterListItem
              attribute="All"
              query="All"
              label="All"
              selected={selected === "All"}
              value={restaurants.length}
              onClick={(label, attribute, query) => handleOnClick(label, attribute, query)}
            />
            <FilterListItem
              attribute="Visited"
              query="Visited"
              label="Visited"
              selected={selected === "Visited"}
              value={restaurants.filter((restaurant) => restaurant.visited).length}
              onClick={(label, attribute, query) => handleOnClick(label, attribute, query)}
            />
            <FilterListItem
              attribute="To Visit"
              query="To Visit"
              label="To Visit"
              selected={selected === "To Visit"}
              value={restaurants.filter((restaurant) => !restaurant.visited).length}
              onClick={(label, attribute, query) => handleOnClick(label, attribute, query)}
            />
          </List>
        </Flex>
      ),
    },
    {
      key: "2",
      label: "Cities",
      children: (
        <Flex wrap gap="small">
          <List size="small" className="w-full">
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
              .filter((location) => location.category === params.category)
              .map((location) => {
                return {
                  value: location.city,
                  label: location.city,
                };
              })
              .map((city) => (
                <FilterListItem
                  key={city.value}
                  attribute="Locations"
                  query={city.value}
                  label={city.value}
                  selected={selected === city.value}
                  value={getCityCount(city.value)}
                  onClick={(label, attribute, query) => handleOnClick(label, attribute, query)}
                />
              ))}
          </List>
        </Flex>
      ),
    },
    {
      key: "3",
      label: "Types",
      children: (
        <Flex wrap gap="small">
          <List size="small" className="w-full">
            {TYPES.map((type) => (
              <FilterListItem
                key={type.value}
                attribute="Type"
                query={type.value}
                label={type.value}
                selected={selected === type.value}
                value={restaurants.filter((restaurant) => restaurant.type === type.value).length}
                onClick={(label, attribute, query) => handleOnClick(label, attribute, query)}
              />
            ))}
          </List>
        </Flex>
      ),
    },
    {
      key: "4",
      label: "Rating",
      children: (
        <Flex wrap gap="small">
          <List size="small" className="w-full">
            {RATING.map((rating) => (
              <FilterListItem
                key={rating.value}
                attribute="Rating"
                query={rating.value}
                label={renderStars(rating.value)}
                selected={selected === rating.value}
                value={
                  restaurants.filter(
                    (restaurant) =>
                      (
                        (parseInt(restaurant.rating.husband) + parseInt(restaurant.rating.wife)) /
                        2
                      ).toString() === rating.value
                  ).length
                }
                onClick={(label, attribute, query) => handleOnClick(label, attribute, query)}
              />
            ))}
          </List>
        </Flex>
      ),
    },
    {
      key: "5",
      label: "Cost",
      children: (
        <Flex wrap gap="small">
          <List size="small" className="w-full">
            {COST.map((cost) => (
              <FilterListItem
                key={cost.value}
                attribute="Cost"
                query={cost.value}
                label={Array.apply(null, Array(cost.value.length))
                  .map((x, i) => i + 1)
                  .map((cost) => (
                    <AttachMoneyIcon key={cost} fontSize="xsmall" className="text-teal-600 -ml-1" />
                  ))}
                selected={selected === cost.value}
                value={restaurants.filter((restaurant) => restaurant.cost === cost.value).length}
                onClick={(label, attribute, query) => handleOnClick(label, attribute, query)}
              />
            ))}
          </List>
        </Flex>
      ),
    },
  ];

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
          onClick={() => navigate(`/restaurants/${params.category}`)}
        />
      </Flex>
      {restaurants && <Collapse items={items} defaultActiveKey={["1"]} />}
      <Button color="default" variant="filled" size="large" onClick={() => navigate(-1)}>
        Cancel
      </Button>
      <Button
        color="default"
        variant="solid"
        size="large"
        onClick={() => navigate(`/restaurants/${params.category}`)}
      >
        Reset
      </Button>
      <Button color="primary" variant="solid" size="large" onClick={handleOnApply}>
        Apply
      </Button>
    </Flex>
  );
};

export default FiltersPage;
