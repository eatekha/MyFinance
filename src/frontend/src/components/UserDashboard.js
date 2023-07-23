import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../App';

const UserDashboard = () => {
  const { user_name, user_password } = useContext(Context);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    retrieveUserID();
  }, []);

  const retrieveUserID = async () => {
    try {
      const response = await fetch('http://localhost:4000/userID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Sending the user_name and user_password in the request body for a GET request
        body: JSON.stringify({ user_name, user_password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User ID retrieved:', data.user_id);
        setUserID(data.user_id);
      } else {
        console.log('User ID not retrieved');
      }
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, but you don't need to return anything here.
    }
  };

  return (
    <div>
      <h1>User Dashboard for {user_name}</h1>

      {userID ? <p>Welcome to your dashboard! Your User ID is {userID}</p> : <p>Loading...</p>}
      {/* Add your dashboard content here */}
    </div>
  );
};

export default UserDashboard;
