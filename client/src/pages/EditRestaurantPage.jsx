//Taylor Zweigle, 2024
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import { getRestaurant } from "../api/restaurants";

import RestaurantForm from "../components/forms/RestaurantForm";

const EditRestaurantPage = () => {
  const params = useParams();

  const { user } = useAuthContext();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const json = await getRestaurant(params.id, user.token);

      if (json.json) {
        setData({
          restaurant: json.json.restaurant,
          city: json.json.city,
          state: json.json.state,
          type: json.json.type,
          rating: json.json.rating,
          cost: json.json.cost,
          visited: json.json.visited ? "Yes" : "No",
        });
      }
    };

    if (params.id && user) {
      fetchRestaurant();
    }
  }, [params.id, user]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-xl">Edit Restaurant</div>
      {data && <RestaurantForm id={params.id} data={data} edit />}
    </div>
  );
};

export default EditRestaurantPage;
