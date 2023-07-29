import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import UserLayout from './UserLayout'; // Import the new UserLayout component
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',  
  },

});

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
        <Routes>
          <Route path="/user/*" element={<UserLayout />} /> {/* Use UserLayout for all routes starting with /user/ */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
