//Taylor Zweigle, 2024
import React, { useState } from "react";
import { useNavigate } from "react-router";

import MenuIcon from "@mui/icons-material/Menu";

import * as Actions from "../../actions/actions";

import { useLogout } from "../../hooks/useLogout";
import { useThemeContext } from "../../hooks/useThemeContext";

import Divider from "../../core/divider/Divider";
import IconButton from "../../core/iconButton/IconButton";
import Menu from "../../core/menu/Menu";
import MenuItem from "../../core/menu/MenuItem";
import Typography from "../../core/typography/Typography";

import LogoutModal from "../modals/LogoutModal";

const PageHeader = ({ title }) => {
  const { logout } = useLogout();
  const { theme, dispatchTheme } = useThemeContext();
  const navigate = useNavigate();

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
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

  const handleToggleThemeClick = () => {
    dispatchTheme({
      type: Actions.SET_THEME,
      payload: theme === "dark" ? "light" : "dark",
    });

    setMenuOpen(false);

    document.documentElement.classList.toggle("dark");
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
    setMenuOpen(false);
  };

  const onLogout = () => {
    setLogoutLoading(true);
    logout();
    setLogoutLoading(false);
  };

  return (
    <>
      <LogoutModal
        open={logoutModalOpen}
        loading={logoutLoading}
        onLogoutClick={onLogout}
        onCancelClick={() => setLogoutModalOpen(false)}
      />
      <div className="flex flex-row items-center gap-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-400 dark:border-gray-700 p-4">
        <div>
          <IconButton onClick={() => setMenuOpen(!menuOpen)}>
            <MenuIcon />
          </IconButton>
          <Menu open={menuOpen} direction="left">
            <MenuItem onClick={handleHomeClick}>Home</MenuItem>
            <MenuItem onClick={handleRestaurantsClick}>Restaurants</MenuItem>
            <Divider />
            <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
            <MenuItem onClick={handleToggleThemeClick}>
              {`Set ${theme === "light" ? "Dark" : "Light"} Mode`}
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
        <Typography variant="title" color="primary">
          {title}
        </Typography>
      </div>
    </>
  );
};

export default PageHeader;
