//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { getRestaurants } from "../api/restaurants";

import FloatingActionButton from "../core/floatingActionButton/FloatingActionButton";
import Tab from "../core/tab/Tab";
import Typography from "../core/typography/Typography";

import RestaurantListItem from "../components/lists/RestaurantListItem";
import IconButton from "../core/iconButton/IconButton";

const HomePage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { restaurants, dispatchRestaurants } = useRestaurantsContext();

  const [tab, setTab] = useState("Visited");

  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurants = await getRestaurants(user.token);

      dispatchRestaurants({ type: Actions.GET_RESTAURANTS, payload: restaurants.json });
    };

    if (user) {
      fetchRestaurants();
    }
  }, [dispatchRestaurants, user]);

  return (
    <>
      <div className="fixed flex flex-col justify-between w-full bg-white shadow-md">
        <div className="flex flex-row justify-between items-center p-4">
          <Typography variant="title" color="primary">
            Restaurants
          </Typography>
          <IconButton onClick={() => logout()}>
            <MenuIcon />
          </IconButton>
        </div>
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
            .map((restaurant) => (
              <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`}>
                <RestaurantListItem restaurant={restaurant} />
              </Link>
            ))}
      </div>
    </>
  );
};

export default HomePage;
