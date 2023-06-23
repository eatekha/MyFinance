const express = require('express');
const router = express.Router();
module.exports = (pool) => {


  // Login route
  router.post('/', async (req, res) => {
    const { user_name, user_password } = req.body;

    try {
      const isValidUser = await validateUser(user_name, user_password);

      if (isValidUser) {
        // User credentials are valid
        user_id = await getUserID(user_name, user_password);
        //const { setUser } = require('../backend/usermodule');
        //setUser(user_id);
        console.log(user_id);

        return res.status(200).json({ message: 'Login successful'});
      } else {
        // User credentials are invalid
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    
  });


//Validating User 
//row[0] returns count 
  async function validateUser(user_name, user_password) {
    const query = 'SELECT COUNT(*) FROM usertable WHERE user_name = $1 AND user_password = $2';
    const values = [user_name, user_password];
    const result = await pool.query(query, values);
    return result.rows[0].count > 0;
  }
  
  async function getUserID(user_name, user_password) {
    const query = 'SELECT user_id FROM usertable WHERE user_name = $1 AND user_password = $2';
    const values = [user_name, user_password];
    const result = await pool.query(query, values);
    user_id = result.rows[0].user_id;
    return user_id;
  }
  module.exports = {
    getUserID
  };

  return router;
};


