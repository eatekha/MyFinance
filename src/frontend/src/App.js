import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, {useState } from 'react';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/LoginPage/LoginPage';
import Register from './pages/RegisterPage/Register';
import UserDashboard from './components/UserDashboard/UserDashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './components/theme';
export const Context = React.createContext(null);



const App = () => {
  var [user_name, setUsername] = useState('');
  var [user_password, setPassword] = useState('');
  




  return (

    <Context.Provider value={{ user_name, user_password, setUsername, setPassword }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          {/* Other routes and components */}
        </Routes>
      </Router>

    </Context.Provider>

  );
};

export default App;