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
  Container,
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
      position="static" 
      className="header"
      sx={{ 
        // Remove backgroundColor override
        boxShadow: 'none !important',
        borderBottom: 'none'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="logo"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              fontSize: { xs: '1.2rem', md: '2.5rem' }
            }}
          >
            WeatherMe
          </Typography>

          <Box className="desktopMenu">
            {menuItems.map((item) => (
              <Typography
                key={item.text}
                component={Link}
                to={item.path}
                className="menuItem"
                sx={{
                  fontSize: '1.1rem',  // Add direct MUI styling
                  // ...rest of existing sx props if any
                }}
              >
                {item.text}
              </Typography>
            ))}
          </Box>

          <IconButton
            className="mobileMenuButton"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          className: "drawer"  // Fix: Use correct object syntax instead of JSX attribute syntax
        }}
      >
        <Box sx={{ textAlign: 'right' }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              className="drawerItem"
            >
              <ListItemIcon className="drawerIcon">
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  sx: { fontWeight: 500 }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Menu;
