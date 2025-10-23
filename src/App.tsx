import React from 'react';
import MapComponent from './components/MapComponent';
import Map2Component from './components/Map2Component';


import './App.css';
import Weather from './weather';
import About from './about';
import Menu from './components/menuComponent';
import KanbanBoard from './components/kanbanComponent';
import { Routes, Route } from 'react-router-dom';
import GlobeComponent from './components/GlobeComponent';


function App() {  
  return (
    <div>
        <Menu />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Weather />} />
            <Route index element={<Weather />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Weather />} />
            <Route path="/board" element={<KanbanBoard />} />
            <Route path="/map" element={<MapComponent />} />
            <Route path="/map2" element={<Map2Component />} />
            <Route path="/globe" element={<GlobeComponent />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
