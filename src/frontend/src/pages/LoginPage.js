import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user_name, setUsername] = useState('');
  const [user_password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  // Function to handle saving credentials in local storage
  const saveCredentialsToLocalStorage = () => {
    localStorage.setItem('user_name', user_name);
    localStorage.setItem('user_password', user_password);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Trim whitespace from username and password
    const trimmedUser = user_name.trim();
    const trimmedPass = user_password.trim();

    setUsername(trimmedUser); // Update state with trimmed username
    setPassword(trimmedPass); // Update state with trimmed password

    try {
      // Make API call to verify credentials
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: trimmedUser, user_password: trimmedPass }),
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        console.log('Login successful:', data);
        setLoginError(false); // Reset the login error state
        saveCredentialsToLocalStorage(); // Save credentials to local storage
        navigate('/user/dashboard', { replace: true }); // Redirect to "/dashboard" route
      } else {
        // Error handling for unsuccessful login
        console.log('Login failed');
        setLoginError(true); // Set the login error state to true
      }
    } catch (error) {
      console.log('API error:', error);
    }
  };
  


   //useEffect to handle redirection when isLoggedIn becomes true
    useEffect(() => {
      if (localStorage.getItem('user_name') && localStorage.getItem('user_password')) {
        navigate('/user/dashboard', { replace: true });
      }
    }, [navigate]);
    
  //Function to sign out


  //1. Check if user is already logged in (maybe hit back button)

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