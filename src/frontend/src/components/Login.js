import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  // Declare and initialize state variables
  const [user_name, setUsername] = useState('');
  const [user_password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset the login error state on submit
    try {
      // Make API call to verify credentials
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name, user_password }),
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        // Handle the response data or perform necessary actions
        console.log('Login successful:', data);
        setLoginError(false); // Reset the login error state
        navigate('/dashboard', { replace: true }); // Redirect to "/dashboard" route

      } else {
        // Error handling for unsuccessful login
        console.log('Login failed');
        setLoginError(true); // Set the login error state to true
      }
    } catch (error) {
      // Error handling for fetch or other API-related errors
      console.log('API error:', error);
    }

    //if no login error, redirect to user dashboar

  };
  



  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={user_name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={user_password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {loginError && <p className="error">Invalid username or password</p>}
      </form>
    </div>
  );
};

export default Login;