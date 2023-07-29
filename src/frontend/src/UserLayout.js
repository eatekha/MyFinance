import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';
import Drawer from './components/Drawer';

const UserLayout = () => {
  return (
    <>
      <Drawer variant="permanent"  />
      <div>
        <Routes>
          <Route path="/dashboard" element={<UserDashboard />} />
          {/* Add more user-based routes here if needed */}
        </Routes>
      </div>
    </>
  );
};

export default UserLayout;
