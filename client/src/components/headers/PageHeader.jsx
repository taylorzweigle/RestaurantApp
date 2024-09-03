//Taylor Zweigle, 2024
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";

import MenuIcon from "@mui/icons-material/Menu";

import * as Actions from "../../actions/actions";

import { useLogout } from "../../hooks/useLogout";
import { useThemeContext } from "../../hooks/useThemeContext";

import IconButton from "../../core/iconButton/IconButton";
import Menu from "../../core/menu/Menu";
import MenuItem from "../../core/menu/MenuItem";
import Tab from "../../core/tab/Tab";

import LogoutModal from "../modals/LogoutModal";

const PageHeader = () => {
  const { logout } = useLogout();
  const { theme, dispatchTheme } = useThemeContext();
  const navigate = useNavigate();

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="flex flex-col bg-gray-100 dark:bg-gray-800 border-b border-gray-400 dark:border-gray-700">
        <div className="flex flex-row gap-2 pl-4 pr-4 pt-2 pb-2">
          <div>
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              <MenuIcon />
            </IconButton>
            <Menu open={menuOpen} direction="left">
              <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
              <MenuItem onClick={handleToggleThemeClick}>
                {`Set ${theme === "light" ? "Dark" : "Light"} Mode`}
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <Tab
            value="Restaurants"
            selected={useLocation().pathname.slice(1) === "restaurants"}
            onClick={() => navigate("/restaurants")}
          />
          <Tab
            value="Filters"
            selected={useLocation().pathname.slice(1) === "filters"}
            onClick={() => navigate("/filters")}
          />
        </div>
      </div>
    </>
  );
};

export default PageHeader;
