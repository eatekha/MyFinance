import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
const Login = () => {
  // Declare and initialize state variables
  var { user_name, user_password, setUsername, setPassword } = useContext(Context);

  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();


  // HandleSubmit Function
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Trim whitespace from username and password
    var trimmedUser = user_name.trim();
    var trimmedPass = user_password.trim();

    user_name = trimmedUser;
    user_password = trimmedPass;
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
        <p>Don't have an account? <a href="/register">Register</a></p>
        {loginError && <p className="error">Invalid username or password</p>}
      </form>
    </div>
  );
};


export default Login;
