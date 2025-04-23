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
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MapIcon from '@mui/icons-material/Map'; // Added Map icon
import { Link } from 'react-router-dom';

// Styled component for the Drawer to customize its width
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 250, // Set your desired width here
    boxSizing: 'border-box',
  },
}));

const Menu: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const list = () => (
    <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <IconButton
        onClick={toggleDrawer(false)}
        style={{ justifyContent: 'flex-end', margin: '10px' }}
      >
        <CloseIcon />
        <Typography variant="body2" style={{ marginLeft: '8px' }}>Close</Typography>
      </IconButton>
      <List>
        {[
          { text: 'Home', icon: <HomeIcon /> },
          { text: 'About', icon: <InfoIcon /> },
          { text: 'Services', icon: <BuildIcon /> },
          { text: 'Board', icon: <BuildIcon /> },
          { text: 'Contact', icon: <ContactMailIcon /> },
          { text: 'Map', icon: <MapIcon /> }, // Added Map menu item
        ].map(({ text, icon }) => (
          <ListItem key={text} component={Link} to={`/${text.toLowerCase()}`}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <StyledDrawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </StyledDrawer>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
