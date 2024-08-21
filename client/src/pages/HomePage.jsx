//Taylor Zweigle, 2024
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { getRestaurants } from "../api/restaurants";
import { CITIES, COST, RATING, TYPES } from "../api/attributes";

import Divider from "../core/divider/Divider";
import FloatingActionButton from "../core/floatingActionButton/FloatingActionButton";
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

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-white shadow-md">
          <PageHeader />
        </div>
        {restaurants && (
          <div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-row justify-between items-center">
                <Typography variant="heading" color="primary" bold>
                  Restaurants
                </Typography>
                <Link to="/restaurants">
                  <Typography variant="body1" color="link" bold>
                    See All
                  </Typography>
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center">
                  <Typography variant="subheading" color="primary">
                    Total
                  </Typography>
                  <Typography variant="subheading" color="primary" bold>
                    {restaurants.length}
                  </Typography>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <Typography variant="subheading" color="primary">
                    Visited
                  </Typography>
                  <Typography variant="subheading" color="primary" bold>
                    {restaurants.filter((restaurant) => restaurant.visited).length}
                  </Typography>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <Typography variant="subheading" color="primary">
                    To Visit
                  </Typography>
                  <Typography variant="subheading" color="primary" bold>
                    {restaurants.filter((restaurant) => !restaurant.visited).length}
                  </Typography>
                </div>
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
                    <Typography variant="subheading" color="primary" bold>
                      {getCityCount(city)}
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
                    <Typography variant="subheading" color="primary" bold>
                      {restaurants.filter((restaurant) => restaurant.type === type).length}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-4 p-4">
              <Typography variant="heading" color="primary" bold>
                Rating
              </Typography>
              <div className="flex flex-col gap-2">
                {RATING.map((rating) => (
                  <div key={rating} className="flex flex-row justify-between items-center">
                    <Typography variant="subheading" color="primary">
                      {rating}
                    </Typography>
                    <Typography variant="subheading" color="primary" bold>
                      {restaurants.filter((restaurant) => restaurant.rating === rating).length}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-4 p-4">
              <Typography variant="heading" color="primary" bold>
                Cost
              </Typography>
              <div className="flex flex-col gap-2">
                {COST.map((cost) => (
                  <div key={cost} className="flex flex-row justify-between items-center">
                    <Typography variant="subheading" color="primary">
                      {cost}
                    </Typography>
                    <Typography variant="subheading" color="primary" bold>
                      {restaurants.filter((restaurant) => restaurant.cost === cost).length}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Link to="/restaurant">
        <FloatingActionButton>
          <AddIcon />
        </FloatingActionButton>
      </Link>
    </>
  );
};

export default HomePage;
