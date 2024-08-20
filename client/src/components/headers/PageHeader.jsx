//Taylor Zweigle, 2024
import React, { useState } from "react";
import { useNavigate } from "react-router";

import MenuIcon from "@mui/icons-material/Menu";

import { useLogout } from "../../hooks/useLogout";

import Divider from "../../core/divider/Divider";
import IconButton from "../../core/iconButton/IconButton";
import Menu from "../../core/menu/Menu";
import MenuItem from "../../core/menu/MenuItem";
import Typography from "../../core/typography/Typography";

const PageHeader = ({ title }) => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleHomeClick = () => {
    setMenuOpen(false);
    navigate("/");
  };

  const handleRestaurantsClick = () => {
    setMenuOpen(false);
    navigate("/restaurants");
  };

  const handleSettingsClick = () => {
    setMenuOpen(false);
    navigate("/settings");
  };

  const handleLogoutClick = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <div className="flex flex-row items-center gap-2 p-4">
      <div>
        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon />
        </IconButton>
        <Menu open={menuOpen} direction="left">
          <MenuItem onClick={handleHomeClick}>Home</MenuItem>
          <MenuItem onClick={handleRestaurantsClick}>Restaurants</MenuItem>
          <Divider />
          <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </div>
      <Typography variant="title" color="primary">
        {title}
      </Typography>
    </div>
  );
};

export default PageHeader;
