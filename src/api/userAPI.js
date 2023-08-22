const express = require('express');
const router = express.Router();

//Change to post request

module.exports = (pool) => {
// Retrieve user_id from database
  router.post('/', async (req, res) => {
    try {
      const user_id = await getUserID(req.body.user_name, req.body.user_password);

      // Assuming getUserID returns a value like { userId: 12345 }
      // You can modify this based on the actual structure of the returned value.
      return res.json({ user_id: user_id });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  });

  
  // Define getUserID function here in the same scope as the router and other functions.
// Define getUserID function here in the same scope as the router and other functions.
async function getUserID(user_name, user_password) {
  const query = 'SELECT user_id FROM usertable WHERE user_name = $1 AND user_password = $2';
  const values = [user_name, user_password];
  const result = await pool.query(query, values);
  
  if (result.rows.length === 0) {
    // No user found with the given credentials
    return null;
  }

  const user_id = result.rows[0].user_id;
  return user_id;
}


  return router;
};
