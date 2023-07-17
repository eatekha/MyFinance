import React, { useState } from 'react';

const Register = () => {
  const [user_name, setUsername] = useState('');
  const [user_password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to verify credentials
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name, user_password }),
      });
    
      if (response.ok) {
        // Successful register
        const data = await response.json();

      } else {
        // Error handling for unsuccessful register
        console.log('Registration failed');
      }

      // Reset form
      /*
      setUsername('');
      setPassword('');
      */
    } catch (error) {
      // Error handling for fetch or other API-related errors
      console.log('API error:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label> {/* Updated here */}
          <input
            type="text" // Updated here
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
