import React from 'react';

//import logo from './logo.svg';
//import jalla from './logo.svg';

import './App.css';
import Weather from './weather';
import About from './about';
import Menu from './components/menuComponent';
import KanbanBoard from './components/kanbanComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      </Routes>
    </Router>
    </div>
  );
}

export default App;
