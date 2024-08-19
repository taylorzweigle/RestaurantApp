//Taylor Zweigle, 2024
import React, { useEffect } from "react";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { getRestaurants } from "../api/restaurants";
import { CITIES, TYPES } from "../api/attributes";

import Divider from "../core/divider/Divider";
import Typography from "../core/typography/Typography";

import PageHeader from "../components/headers/PageHeader";

const HomePage = () => {
  const { user } = useAuthContext();

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
    <div className="flex flex-col">
      <div className="bg-white shadow-md">
        <PageHeader title="Home" />
      </div>
      {restaurants && (
        <div>
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-row justify-between items-center">
              <Typography variant="subheading" color="primary">
                Total
              </Typography>
              <Typography variant="title" color="primary">
                {restaurants.length}
              </Typography>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Typography variant="subheading" color="primary">
                Visited
              </Typography>
              <Typography variant="title" color="primary">
                {restaurants.filter((restaurant) => restaurant.visited).length}
              </Typography>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Typography variant="subheading" color="primary">
                To Visit
              </Typography>
              <Typography variant="title" color="primary">
                {restaurants.filter((restaurant) => !restaurant.visited).length}
              </Typography>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4 p-4">
            <Typography variant="heading" color="primary" bold>
              Cities
            </Typography>
            <div className="flex flex-col gap-2">
              {CITIES.map((city) => (
                <div key={city} className="flex flex-row justify-between items-center">
                  <Typography variant="subheading" color="primary">
                    {city}
                  </Typography>
                  <Typography variant="title" color="primary">
                    {restaurants.filter((restaurant) => restaurant.city === city).length}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4 p-4">
            <Typography variant="heading" color="primary" bold>
              Types
            </Typography>
            <div className="flex flex-col gap-2">
              {TYPES.map((type) => (
                <div key={type} className="flex flex-row justify-between items-center">
                  <Typography variant="subheading" color="primary">
                    {type}
                  </Typography>
                  <Typography variant="title" color="primary">
                    {restaurants.filter((restaurant) => restaurant.type === type).length}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
