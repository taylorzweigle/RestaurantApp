//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import FloatingActionButton from "../core/floatingActionButton/FloatingActionButton";

import TextInput from "../core/textInput/TextInput";

import PageHeader from "../components/headers/PageHeader";
import RestaurantListItem from "../components/lists/RestaurantListItem";

const RestaurantsPage = () => {
  const { restaurants } = useRestaurantsContext();

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (restaurants) {
      setFilteredRestaurants(restaurants);
    }
  }, [restaurants]);

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
      <div className="pt-20">
        <div className="flex flex-col justify-start items-end gap-4 p-4 pt-8">
          <TextInput
            type="text"
            label="Search"
            value={searchQuery}
            suffix={searchQuery !== "" ? <CloseIcon /> : null}
            onChange={handleSearch}
            onSuffixClick={handleClear}
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
