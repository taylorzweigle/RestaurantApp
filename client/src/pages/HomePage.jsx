//Taylor Zweigle, 2024
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
//import { useLogout } from "../hooks/useLogout";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { getRestaurants } from "../api/restaurants";

import FloatingActionButton from "../core/floatingActionButton/FloatingActionButton";
import Typography from "../core/typography/Typography";

import RestaurantListItem from "../components/lists/RestaurantListItem";

const HomePage = () => {
  const { user } = useAuthContext();
  //const { logout } = useLogout();
  const { restaurants, dispatchRestaurants } = useRestaurantsContext();

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
      <div className="fixed flex flex-row gap-2 items-center w-full h-24 bg-white p-4 shadow-md">
        <Typography variant="title" color="primary">
          Restaurants
        </Typography>
      </div>
      <Link to="/restaurant">
        <FloatingActionButton>
          <AddIcon />
        </FloatingActionButton>
      </Link>
      <div className="flex flex-col gap-0 pt-24">
        {restaurants &&
          restaurants.map((restaurant) => (
            <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`}>
              <RestaurantListItem restaurant={restaurant} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default HomePage;
