//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import * as Actions from "../actions/actions";

import { getRestaurants } from "../api/restaurants";

import { useAuthContext } from "../hooks/useAuthContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import FloatingActionButton from "../core/floatingActionButton/FloatingActionButton";
import TextInput from "../core/textInput/TextInput";

import PageHeader from "../components/headers/PageHeader";
import RestaurantListItem from "../components/lists/RestaurantListItem";

const RestaurantsPage = () => {
  const { user } = useAuthContext();

  const { restaurants, dispatchRestaurants } = useRestaurantsContext();

  const [searchParams] = useSearchParams();

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurants = await getRestaurants(user.token);

      dispatchRestaurants({ type: Actions.GET_RESTAURANTS, payload: restaurants.json });
    };

    if (user) {
      fetchRestaurants();
    }
  }, [dispatchRestaurants, user]);

  useEffect(() => {
    if (restaurants) {
      switch (searchParams.get("attribute")) {
        case "Visited":
          setFilteredRestaurants(restaurants.filter((restaurant) => restaurant.visited === true));
          break;
        case "To Visit":
          setFilteredRestaurants(restaurants.filter((restaurant) => restaurant.visited === false));
          break;
        case "Locations":
          let filtered = [];

          for (let i = 0; i < restaurants.length; i++) {
            for (let j = 0; j < restaurants[i].locations.length; j++) {
              if (restaurants[i].locations[j].city === searchParams.get("query")) {
                filtered.push(restaurants[i]);
              }
            }
          }

          setFilteredRestaurants(filtered);
          break;
        case "Type":
          setFilteredRestaurants(
            restaurants.filter((restaurant) => restaurant.type === searchParams.get("query"))
          );
          break;
        case "Rating":
          setFilteredRestaurants(
            restaurants.filter((restaurant) => restaurant.rating === searchParams.get("query"))
          );
          break;
        case "Cost":
          setFilteredRestaurants(
            restaurants.filter((restaurant) => restaurant.cost === searchParams.get("query"))
          );
          break;
        default:
          setFilteredRestaurants(restaurants);
          break;
      }
    }
  }, [restaurants, searchParams]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filtered = restaurants.filter((restaurant) =>
      restaurant.restaurant.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredRestaurants(filtered);
  };

  const handleClear = () => {
    setSearchQuery("");

    setFilteredRestaurants(restaurants);
  };

  return (
    <>
      <div className="fixed flex flex-col justify-between w-full bg-white shadow-md">
        <PageHeader title="Restaurants" />
      </div>
      <Link to="/restaurant">
        <FloatingActionButton>
          <AddIcon />
        </FloatingActionButton>
      </Link>
      <div className="pt-28">
        <div className="flex flex-col justify-start items-end gap-4 p-4 pt-8">
          <TextInput
            type="text"
            label="Search"
            value={searchQuery}
            clearable
            onChange={handleSearch}
            onClear={handleClear}
          />
        </div>
        <div className="flex flex-col gap-0">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantListItem key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RestaurantsPage;
