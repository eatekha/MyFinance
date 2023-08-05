import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';
import Drawer from './components/Drawer';
import MyAppBar from './components/MyAppBar';

const UserLayout = () => {
  return (
    <>
      <MyAppBar/>
      <Drawer variant="permanent"  />
      <div style={{ marginTop: '64px' }}> {/* 64px is the default height of AppBar */}
        <Routes>
          <Route path="/dashboard" element={<UserDashboard/>} />
          {/* Add more user-based routes here if needed */}
        </Routes>
      </div>
    </>
  );
};

export default UserLayout;
