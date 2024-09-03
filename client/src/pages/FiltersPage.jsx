//Taylor Zweigle, 2024
import React from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";

import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { CITIES, COST, RATING, TYPES } from "../api/attributes";

import FloatingActionButton from "../core/floatingActionButton/FloatingActionButton";
import Typography from "../core/typography/Typography";

import FilterCard from "../components/cards/FilterCard";
import PageHeader from "../components/headers/PageHeader";

const FiltersPage = () => {
  const { restaurants } = useRestaurantsContext();

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
              <Typography variant="subtitle" color="primary">
                Restaurants
              </Typography>
              <div className="flex flex-row flex-wrap gap-2">
                <FilterCard variant="landscape" value="All" displayValue="All" count={restaurants.length} />
                <FilterCard
                  variant="landscape"
                  type="Visited"
                  value="Visited"
                  displayValue="Visited"
                  count={restaurants.filter((restaurant) => restaurant.visited).length}
                />
                <FilterCard
                  variant="landscape"
                  type="To Visit"
                  value="To Visit"
                  displayValue="To Visit"
                  count={restaurants.filter((restaurant) => !restaurant.visited).length}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <Typography variant="subtitle" color="primary">
                Cities
              </Typography>
              <div className="flex flex-row flex-wrap gap-2">
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
              <Typography variant="subtitle" color="primary">
                Type
              </Typography>
              <div className="flex flex-row flex-wrap gap-2">
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
              <Typography variant="subtitle" color="primary">
                Rating
              </Typography>
              <div className="flex flex-row flex-wrap gap-2">
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
              <Typography variant="subtitle" color="primary">
                Cost
              </Typography>
              <div className="flex flex-row flex-wrap gap-2">
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

export default FiltersPage;
