import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import MapIcon from '@mui/icons-material/Map';
import WbSunnyIcon from '@mui/icons-material/WbSunny';  // Add this import for weather icon
import { Link } from 'react-router-dom';
import './menuComponent.css';  // Update the import to use new CSS file

const Menu: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Services', icon: <WbSunnyIcon />, path: '/services' },  // Change BuildIcon to WbSunnyIcon
    { text: 'Board', icon: <BuildIcon />, path: '/board' },
    { text: 'Map', icon: <MapIcon />, path: '/map' },
    { text: 'Map2', icon: <MapIcon />, path: '/map2' },
    { text: 'Globe', icon: <MapIcon />, path: '/globe' },
  ];

  return (
    <AppBar 
      position="fixed" 
      className="header"
      sx={{ 
        // Remove backgroundColor override
        boxShadow: 'none !important',
        borderBottom: 'none',
        zIndex: 1100 // Ensure header stays above other content
      }}
    >
      <Toolbar disableGutters className="header-toolbar">
        {/* Left section - Logo */}
        <Box className="header-left" padding="0 16px">
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="logo"
            sx={{
              fontSize: { xs: '1.2rem', md: '2rem' }
            }}
          >
            WeatherMe
          </Typography>
        </Box>

        {/* Center section - Menu items */}
        <Box className="header-center">
          <Box className="desktopMenu">
            {menuItems.map((item) => (
              <Typography
                key={item.text}
                component={Link}
                to={item.path}
                className="menuItem"
                sx={{
                  fontSize: '1.1rem',
                }}
              >
                {item.text}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Right section - Hamburger */}
        <Box className="header-right">
          <IconButton
            className="mobileMenuButton"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          className: "drawer-paper"
        }}
      >
        <Box className="drawer-header">
          <IconButton 
            onClick={() => setDrawerOpen(false)}
            className="drawer-close-button"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List className="drawer-list">
          {menuItems.map((item) => (
            <ListItem
              key={item.text}              
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              className="drawer-item"
            >
              <ListItemIcon className="drawer-icon">
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                className="drawer-text"
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Menu;
