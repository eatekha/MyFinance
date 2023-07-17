import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to MyFinance!!</h1>
      <p>This is the boilerplate home page for your React application.</p>  
      {/*ul = unordered list
          li = each element in unorderend link
          a = how we put link in*/}
          
      <h2>Component Links</h2>
      <ul>
       <li><a href="http://localhost:3000/login">Login</a></li>
       <li><a href="http://localhost:3000/register">Register</a></li>
      </ul> 
    </div>
  );
};

export default HomePage;
