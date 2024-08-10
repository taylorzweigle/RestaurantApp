//Taylor Zweigle, 2024
import React, { useEffect } from "react";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { getRestaurants } from "../api/restaurants";

import RestaurantListItem from "../components/RestaurantListItem";

const HomePage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
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
      {restaurants &&
        restaurants.map((restaurant) => (
          <RestaurantListItem
            key={restaurant._id}
            restaurant={restaurant.restaurant}
            city={restaurant.city}
            state={restaurant.state}
            type={restaurant.type}
            rating={restaurant.rating}
          />
        ))}
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default HomePage;
