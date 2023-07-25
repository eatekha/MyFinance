import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <h3>My Sidebar</h3>
        </div>
    </div>
  );
};

export default Sidebar;
