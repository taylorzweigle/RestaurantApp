//Taylor Zweigle, 2024
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";

import * as Actions from "../actions/actions";

import { useAuthContext } from "../hooks/useAuthContext";
import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { getRestaurants } from "../api/restaurants";
import { CITIES, COST, RATING, TYPES } from "../api/attributes";

import FloatingActionButton from "../core/floatingActionButton/FloatingActionButton";
import Typography from "../core/typography/Typography";

import FilterCard from "../components/cards/FilterCard";
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
              <div className="flex flex-row flex-wrap gap-4">
                <div className="flex flex-row justify-center bg-teal-600 dark:bg-gray-800 w-full p-1 rounded-md">
                  <Typography variant="subtitle" color="primary">
                    Restaurants
                  </Typography>
                </div>
                <FilterCard value="All" displayValue="All" count={restaurants.length} />
                <FilterCard
                  type="Visited"
                  value="Visited"
                  displayValue="Visited"
                  count={restaurants.filter((restaurant) => restaurant.visited).length}
                />
                <FilterCard
                  type="To Visit"
                  value="To Visit"
                  displayValue="To Visit"
                  count={restaurants.filter((restaurant) => !restaurant.visited).length}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-row justify-center bg-teal-600 dark:bg-gray-800 w-full p-1 rounded-md">
                <Typography variant="subtitle" color="primary">
                  Cities
                </Typography>
              </div>
              <div className="flex flex-row flex-wrap gap-4">
                {CITIES.map((city) => (
                  <FilterCard
                    key={city}
                    type="Locations"
                    value={city}
                    displayValue={city}
                    count={getCityCount(city)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-row justify-center bg-teal-600 dark:bg-gray-800 w-full p-1 rounded-md">
                <Typography variant="subtitle" color="primary">
                  Type
                </Typography>
              </div>
              <div className="flex flex-row flex-wrap gap-4">
                {TYPES.map((type) => (
                  <FilterCard
                    key={type}
                    type="Type"
                    value={type}
                    displayValue={type}
                    count={restaurants.filter((restaurant) => restaurant.type === type).length}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-row justify-center bg-teal-600 dark:bg-gray-800 w-full p-1 rounded-md">
                <Typography variant="subtitle" color="primary">
                  Rating
                </Typography>
              </div>
              <div className="flex flex-row flex-wrap gap-4">
                {RATING.map((rating) => (
                  <FilterCard
                    key={rating}
                    type="Rating"
                    value={rating}
                    displayValue={Array.apply(null, Array(parseInt(rating)))
                      .map((x, i) => i + 1)
                      .map((rating) => (
                        <StarIcon key={rating} fontSize="xsmall" className="text-amber-500" />
                      ))}
                    count={restaurants.filter((restaurant) => restaurant.rating === rating).length}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-row justify-center bg-teal-600 dark:bg-gray-800 w-full p-1 rounded-md">
                <Typography variant="subtitle" color="primary">
                  Cost
                </Typography>
              </div>
              <div className="flex flex-row flex-wrap gap-4">
                {COST.map((cost) => (
                  <FilterCard
                    key={cost}
                    type="Cost"
                    value={cost}
                    displayValue={Array.apply(null, Array(cost.length))
                      .map((x, i) => i + 1)
                      .map((cost) => (
                        <AttachMoneyIcon
                          key={cost}
                          fontSize="small"
                          className="text-teal-600 -ml-1 -mr-1"
                        />
                      ))}
                    count={restaurants.filter((restaurant) => restaurant.cost === cost).length}
                  />
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
