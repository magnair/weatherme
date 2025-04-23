import React from 'react';
import MapComponent from './components/MapComponent';

//import logo from './logo.svg';
//import jalla from './logo.svg';

import './App.css';
import Weather from './weather';
import About from './about';
import Menu from './components/menuComponent';
import KanbanBoard from './components/kanbanComponent';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';


function App() {
  return (
    <div>
    <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Weather />} />
          <Route path="/board" element={<KanbanBoard />} />
          <Route path="/map" element={<MapComponent />} />
        </Routes>

    </Router>
    </div>
  );
}

export default App;
