import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, {useState } from 'react';
import HomePage from './components/HomePage';
import Login from './components/LoginPage';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
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