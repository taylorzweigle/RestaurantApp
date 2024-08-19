//Taylor Zweigle, 2024
import React, { useState } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import FloatingActionButton from "../core/floatingActionButton/FloatingActionButton";

import Tab from "../core/tab/Tab";

import PageHeader from "../components/headers/PageHeader";
import RestaurantListItem from "../components/lists/RestaurantListItem";

const RestaurantsPage = () => {
  const { restaurants } = useRestaurantsContext();

  const [tab, setTab] = useState("Visited");

  return (
    <>
      <div className="fixed flex flex-col justify-between w-full bg-white shadow-md">
        <PageHeader title="Restaurants" />
        <div className="flex flex-row gap-0 w-full">
          <Tab value="Visited" selected={tab === "Visited"} onClick={() => setTab("Visited")} />
          <Tab value="To Visit" selected={tab === "To Visit"} onClick={() => setTab("To Visit")} />
        </div>
      </div>
      <Link to="/restaurant">
        <FloatingActionButton>
          <AddIcon />
        </FloatingActionButton>
      </Link>
      <div className="flex flex-col gap-0 pt-32">
        {restaurants &&
          restaurants
            .filter((restaurant) => restaurant.visited === (tab === "Visited"))
            .map((restaurant) => <RestaurantListItem key={restaurant._id} restaurant={restaurant} />)}
      </div>
    </>
  );
};

export default RestaurantsPage;
