//Taylor Zweigle, 2024
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { getRestaurants } from "../api/restaurants";

import RestaurantListItem from "../components/lists/RestaurantListItem";

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
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <Link to="/restaurant">
          <button className="p-4 bg-sky-600 text-white rounded-md">Add Restaurant</button>
        </Link>
        <button className="p-4 bg-rose-600 text-white rounded-md" onClick={() => logout()}>
          Logout
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {restaurants &&
          restaurants.map((restaurant) => (
            <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`}>
              <RestaurantListItem
                restaurant={restaurant.restaurant}
                city={restaurant.city}
                state={restaurant.state}
                type={restaurant.type}
                rating={restaurant.rating}
                cost={restaurant.cost}
                visited={restaurant.visited}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
