import React, { useContext, useEffect, useState } from 'react';

const UserDashboard = () => {
  const storedUserName = localStorage.getItem('user_name');
  const storedUserPassword = localStorage.getItem('user_password');  const [userID, setUserID] = useState(null);

  useEffect(() => {
    retrieveUserID();
  }, []);

  const retrieveUserID = async () => {
    try {
      // Retrieve data from local storage


      // Check if data is present in local storage
      if (storedUserName && storedUserPassword) {
        const response = await fetch('http://localhost:4000/userID', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Sending the stored username and password in the request body for a GET request
          body: JSON.stringify({ user_name: storedUserName, user_password: storedUserPassword }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User ID retrieved:', data.user_id);
          setUserID(data.user_id);
        } else {
          console.log('User ID not retrieved');
        }
      } else {
        console.log('Stored credentials not found in local storage');
      }
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, but you don't need to return anything here.
    }
  };

  return (
    <div>
      <h1>User Dashboard for {storedUserName}</h1>
      {userID ? <p>Welcome to your dashboard! Your User ID is {userID}</p> : <p>Loading...</p>}
      {/* Add your dashboard content here */}
    </div>
  );
};

export default UserDashboard;
