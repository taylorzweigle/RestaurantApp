//Taylor Zweigle, 2024
import React, { useState } from "react";
import { Link } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import * as Actions from "../../actions/actions";

import { deleteRestaurant } from "../../api/restaurants";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useRestaurantsContext } from "../../hooks/useRestaurantsContext";

import IconButton from "../../core/iconButton/IconButton";
import Menu from "../../core/menu/Menu";
import MenuItem from "../../core/menu/MenuItem";
import Tag from "../../core/tag/Tag";
import Typography from "../../core/typography/Typography";

const RestaurantListItem = ({ restaurant }) => {
  const { user } = useAuthContext();
  const { dispatchRestaurants } = useRestaurantsContext();

  const [menuOpen, setMenuOpen] = useState(false);

  const renderStars = (count) => {
    let stars = [];

    for (let i = 0; i < count; i++) {
      stars.push(<StarIcon key={i} fontSize="small" className="text-amber-500" />);
    }

    for (let i = count; i < 5; i++) {
      stars.push(<StarBorderIcon key={i} fontSize="small" className="text-slate-400" />);
    }

    return stars;
  };

  const handleOnDelete = async () => {
    const json = await deleteRestaurant(restaurant._id, user.token);

    if (json.json) {
      dispatchRestaurants({ type: Actions.DELETE_RESTAURANT, payload: json.json });
    }
  };

  return (
    <div className="flex flex-row justify-between items-center bg-white border-b border-slate-400 pt-3 pr-4 pb-3 pl-4">
      <div className="flex flex-col gap-0">
        <div className="flex flex-row items-center gap-2">
          <Typography variant="body1" bold>
            {restaurant.restaurant}
          </Typography>
        </div>
        <div className="flex flex-col gap-1">
          <Typography variant="body2">{`${restaurant.type} | ${restaurant.cost}`}</Typography>
          <div className="flex flex-row items-center gap-2">
            {restaurant.locations.map((location) => (
              <Tag key={location.city}>{`${location.city}, ${location.state}`}</Tag>
            ))}
          </div>
          {restaurant.rating && (
            <div className="flex flex-row gap-0 pt-1">{renderStars(restaurant.rating)}</div>
          )}
        </div>
      </div>
      <div>
        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
          <MoreVertIcon />
        </IconButton>
        <Menu open={menuOpen} direction="right">
          <Link to={`/restaurant/${restaurant._id}`}>
            <MenuItem onClick={() => setMenuOpen(false)}>Edit</MenuItem>
          </Link>
          <MenuItem onClick={handleOnDelete}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default RestaurantListItem;
