//Taylor Zweigle, 2024
import React from "react";
import { useNavigate } from "react-router-dom";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";

import { useRestaurantsContext } from "../hooks/useRestaurantsContext";

import { CITIES, COST, RATING, TYPES } from "../api/attributes";

import FilterCard from "../components/cards/FilterCard";

const FiltersPage = () => {
  const { restaurants } = useRestaurantsContext();

  const navigate = useNavigate();

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-0 bg-gray-100 dark:bg-gray-800 border-b border-gray-400 dark:border-gray-700">
        <div className="flex flex-row justify-between items-center pl-4 pr-4 pt-2 pb-2">
          <p>Filters</p>
          <button onClick={() => navigate("/")}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {restaurants && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <p>Restaurants</p>
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
            <div className="flex flex-col gap-4">
              <p>Cities</p>
              <div className="flex flex-row flex-wrap gap-2">
                {CITIES.map((city) => (
                  <FilterCard
                    key={city.value}
                    type="Locations"
                    value={city.value}
                    displayValue={city.value}
                    count={getCityCount(city.value)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p>Type</p>
              <div className="flex flex-row flex-wrap gap-2">
                {TYPES.map((type) => (
                  <FilterCard
                    key={type.value}
                    type="Type"
                    value={type.value}
                    displayValue={type.value}
                    count={restaurants.filter((restaurant) => restaurant.type === type.value).length}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p>Rating</p>
              <div className="flex flex-row flex-wrap gap-2">
                {RATING.map((rating) => (
                  <FilterCard
                    key={rating.value}
                    variant="landscape"
                    type="Rating"
                    value={rating.value}
                    displayValue={Array.apply(null, Array(parseInt(rating.value)))
                      .map((x, i) => i + 1)
                      .map((rating) => (
                        <StarIcon key={rating} fontSize="xsmall" className="text-amber-500" />
                      ))}
                    count={restaurants.filter((restaurant) => restaurant.rating === rating.value).length}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p>Cost</p>
              <div className="flex flex-row flex-wrap gap-2">
                {COST.map((cost) => (
                  <FilterCard
                    key={cost.value}
                    variant="landscape"
                    type="Cost"
                    value={cost.value}
                    displayValue={Array.apply(null, Array(cost.value.length))
                      .map((x, i) => i + 1)
                      .map((cost) => (
                        <AttachMoneyIcon
                          key={cost}
                          fontSize="small"
                          className="text-teal-600 -ml-1 -mr-1"
                        />
                      ))}
                    count={restaurants.filter((restaurant) => restaurant.cost === cost.value).length}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <button onClick={() => navigate("/")}>Reset</button>
      </div>
    </div>
  );
};

export default FiltersPage;
