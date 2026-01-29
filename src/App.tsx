import React from 'react';
import MapComponent from './components/MapComponent';
import Map2Component from './components/Map2Component';
import './App.css';
import Weather from './weather';
import About from './about';
import Menu from './components/menuComponent';
import KanbanBoard from './components/kanbanComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import GlobeComponent from './components/GlobeComponent';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Menu />
              <div className="main-content">
                <Weather />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Menu />
              <div className="main-content">
                <Weather />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/board"
          element={
            <ProtectedRoute>
              <Menu />
              <div className="main-content">
                <KanbanBoard />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Menu />
              <div className="main-content">
                <MapComponent />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/map2"
          element={
            <ProtectedRoute>
              <Menu />
              <div className="main-content">
                <Map2Component />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/globe"
          element={
            <ProtectedRoute>
              <Menu />
              <div className="main-content">
                <GlobeComponent />
              </div>
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>
    </div>
  );
}

export default App;
