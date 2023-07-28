import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, {useState } from 'react';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/Register';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Sidebar from './components/Sidebar/Sidebar';
import { makeStyles } from '@material-ui/core/styles'
import Drawer from './components/Sidebar/Drawer'

const useStyles = makeStyles({
    container: {
        display: 'flex',
    }
})

const App = () => {
  const classes = useStyles();


  return (
    <Router>

        {/* Public Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        {/* User-Based Routes */}
        <div className={classes.container}> 
        <Drawer variant="permanent"/>
        <Routes>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
        </div>

      </Router>
  );
};

export default App;