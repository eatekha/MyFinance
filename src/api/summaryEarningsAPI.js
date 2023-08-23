const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    router.post('/', async (req, res) => {
        const { user_name } = req.body;
        try {
            const userID = await getUserID(user_name);
            const transactionsTotal = await getTotalEarnings(userID);

            if (transactionsTotal !== 0) {return res.status(200).json({ message: transactionsTotal});}

            else {return res.status(200).json({ message: '0'});}

          } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
          }
        });

    async function getUserID(username) {
        const query = 'SELECT user_id FROM usertable WHERE user_name = $1;';
        const values = [username];
        
        try {
          const result = await pool.query(query, values);
          if (result.rows.length > 0) {
            return result.rows[0].user_id;
          } else {
            return null; // Return null if no matching user found
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
          throw error;
        }
      }
      


      /**
       * 
       * @param {*} username 
       * @returns 
       */

    async function getTotalEarnings(userid) {
        const query = 'SELECT SUM(amount) AS total_positive_amount FROM transactions WHERE user_id= $1 AND amount > 0;';
        const values = [userid];
        const result = await pool.query(query, values);
        return result.rows[0];
      }
      return router;
}

