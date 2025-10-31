import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  MenuList,
} from "@mui/material";
import { FiMenu, FiUser } from "react-icons/fi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function AppHeader({ sidebarOpen, setSidebarOpen , pageTitle }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    window.location.reload();
  };

  const menuOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={1}
      sx={{
        bgcolor: "primary",
        borderBottom: "1px solid",
        borderColor: "success.dark",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{ display: { lg: "none" } }}
          aria-label="Toggle sidebar"
        >
          <FiMenu size={22} />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to="/seller_dashboard"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 600,
          }}
        >
          {pageTitle}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="body1"
            sx={{ display: { xs: "none", sm: "block" }, fontWeight: 500 }}
          >
            {Cookies.get("name")}
          </Typography>

          <IconButton
            onClick={handleMenuOpen}
            sx={{
              bgcolor: "grey.200",
              color: "grey.800",
              "&:hover": { bgcolor: "grey.300" },
            }}
          >
            {Cookies.get("image") ? (
              <Avatar alt={Cookies.get("name")} src={Cookies.get("image")} />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "transparent",
                  width: 36,
                  height: 36,
                  color: "inherit",
                }}
              >
                <FiUser size={20} />
              </Avatar>
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleMenuClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
