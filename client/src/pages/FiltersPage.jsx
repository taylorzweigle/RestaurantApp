//Taylor Zweigle, 2025
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Collapse, Flex, Typography } from "antd";

import { ArrowLeftOutlined, UndoOutlined } from "@ant-design/icons";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import StarHalf from "@mui/icons-material/StarHalf";

import * as Actions from "../actions/actions";

import { useFiltersContext } from "../hooks/useFiltersContext";
import { useLocationsContext } from "../hooks/useLocationsContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { COST, RATING, TYPES } from "../api/attributes";

import FilterListItem from "../components/lists/FilterListItem";

import { sortLocationsArray } from "../utility/Sort";

const FiltersPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { filters, dispatchFilters } = useFiltersContext();
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

  const handleOnClick = ({ attribute, query }) => {
    if (filters.some((f) => f.query === query)) {
      dispatchFilters({ type: Actions.DELETE_FILTER, payload: { attribute, query } });
      return;
    } else {
      dispatchFilters({ type: Actions.CREATE_FILTER, payload: { attribute, query } });
    }
  };

  const handleOnApply = () => {
    if (filters) {
      let searchParamsString = "";

      for (let i = 0; i < filters.length; i++) {
        searchParamsString += `attribute=${filters[i].attribute}&query=${filters[i].query}`;

        if (i !== filters.length - 1) {
          searchParamsString += "&";
        }
      }

      navigate(`/restaurants/${params.category}/?${searchParamsString}`);
    }
  };

  const handleOnReset = () => {
    dispatchFilters({ type: Actions.RESET_FILTERS });

    navigate(`/restaurants/${params.category}`);
  };

  const items = [
    {
      key: "1",
      label: "Restaurants",
      children: (
        <Flex wrap gap="small">
          <FilterListItem
            attribute="Visited"
            query="Visited"
            label="Visited"
            selected={filters.some((f) => f.query === "Visited")}
            value={restaurants.filter((restaurant) => restaurant.visited).length}
            onClick={(attribute, query) => handleOnClick(attribute, query)}
          />
          <FilterListItem
            attribute="Visited"
            query="To Visit"
            label="To Visit"
            selected={filters.some((f) => f.query === "To Visit")}
            value={restaurants.filter((restaurant) => !restaurant.visited).length}
            onClick={(attribute, query) => handleOnClick(attribute, query)}
          />
        </Flex>
      ),
    },
    {
      key: "2",
      label: "Cities",
      children: (
        <Flex wrap gap="small">
          {locations &&
            sortLocationsArray(locations)
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
                  selected={filters.some((f) => f.query === city.value)}
                  value={getCityCount(city.value)}
                  onClick={(attribute, query) => handleOnClick(attribute, query)}
                />
              ))}
        </Flex>
      ),
    },
    {
      key: "3",
      label: "Types",
      children: (
        <Flex wrap gap="small">
          {TYPES.map((type) => (
            <FilterListItem
              key={type.value}
              attribute="Type"
              query={type.value}
              label={type.value}
              selected={filters.some((f) => f.query === type.value)}
              value={restaurants.filter((restaurant) => restaurant.type === type.value).length}
              onClick={(attribute, query) => handleOnClick(attribute, query)}
            />
          ))}
        </Flex>
      ),
    },
    {
      key: "4",
      label: "Rating",
      children: (
        <Flex wrap gap="small">
          {RATING.map((rating) => (
            <FilterListItem
              key={rating.value}
              attribute="Rating"
              query={rating.value}
              label={renderStars(rating.value)}
              selected={filters.some((f) => f.query === rating.value)}
              value={
                restaurants.filter(
                  (restaurant) =>
                    (
                      (parseInt(restaurant.rating.husband) + parseInt(restaurant.rating.wife)) /
                      2
                    ).toString() === rating.value
                ).length
              }
              onClick={(attribute, query) => handleOnClick(attribute, query)}
            />
          ))}
        </Flex>
      ),
    },
    {
      key: "5",
      label: "Cost",
      children: (
        <Flex wrap gap="small">
          {COST.map((cost) => (
            <FilterListItem
              key={cost.value}
              attribute="Cost"
              query={cost.value}
              label={Array.apply(null, Array(cost.value.length))
                .map((x, i) => i + 1)
                .map((cost) => (
                  <AttachMoneyIcon
                    key={cost}
                    fontSize="xsmall"
                    className={`${filters.includes(cost.value) ? "text-white" : "text-teal-600"} -ml-1`}
                  />
                ))}
              selected={filters.some((f) => f.query === cost.value)}
              value={restaurants.filter((restaurant) => restaurant.cost === cost.value).length}
              onClick={(attribute, query) => handleOnClick(attribute, query)}
            />
          ))}
        </Flex>
      ),
    },
  ];

  return (
    <Flex vertical justify="space-between" className="bg-neutral-100 dark:bg-neutral-950 p-3 h-screen">
      <Flex vertical gap="middle" className="mb-4">
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
            onClick={handleOnReset}
          />
        </Flex>
        {restaurants && <Collapse items={items} defaultActiveKey={["1", "2", "3", "4", "5"]} />}
      </Flex>
      <Flex vertical gap="middle">
        <Button color="default" variant="filled" size="large" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button color="primary" variant="solid" size="large" onClick={handleOnApply}>
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};

export default FiltersPage;
