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

import Divider from "../core/divider/Divider";
import FloatingActionButton from "../core/floatingActionButton/FloatingActionButton";
import Menu from "../core/menu/Menu";
import MenuItem from "../core/menu/MenuItem";
import Tab from "../core/tab/Tab";
import Typography from "../core/typography/Typography";

import RestaurantListItem from "../components/lists/RestaurantListItem";
import IconButton from "../core/iconButton/IconButton";

const HomePage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { restaurants, dispatchRestaurants } = useRestaurantsContext();

  const [menuOpen, setMenuOpen] = useState(false);
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
          <div className="flex flex-row items-end gap-1">
            <Typography variant="title" color="primary">
              Restaurants
            </Typography>
            <Typography variant="subheading" color="primary">
              {`(${restaurants ? restaurants.length : 0})`}
            </Typography>
          </div>
          <div>
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              <MenuIcon />
            </IconButton>
            <Menu open={menuOpen} direction="right">
              <MenuItem onClick={() => {}}>Home</MenuItem>
              <MenuItem onClick={() => {}}>Restaurants</MenuItem>
              <Divider />
              <MenuItem onClick={() => {}}>Settings</MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </Menu>
          </div>
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
            .map((restaurant) => <RestaurantListItem key={restaurant._id} restaurant={restaurant} />)}
      </div>
    </>
  );
};

export default HomePage;
