/**
 * This file takes exports the amount spent on transactions over the last 6 months and exports in a json file
 */




const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    router.post('/', async (req, res) => {
        const { user_name } = req.body;
        try {
            const userID = await getUserID(user_name);
            const data = await getRecentTransactions(userID);
            return res.status(200).json(data);
            }
         catch (error) {
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

    async function getRecentTransactions(userid) {
        const query = 'SELECT transaction, keyword, date, category, month, amount FROM transactions WHERE user_id=$1 ORDER BY date DESC LIMIT 50;';
        const values = [userid];
        const result = await pool.query(query, values);
        return result.rows;
      }


      


      return router;
}

