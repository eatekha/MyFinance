import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, {useState } from 'react';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/Register';
import UserDashboard from './components/UserDashboard/UserDashboard';


const App = () => {



  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          {/* Other routes and components */}
        </Routes>
      </Router>
  );
};

export default App;