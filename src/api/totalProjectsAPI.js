/**
 * This file takes exports the amount spent on transactions over the last 6 months and exports in a json file
 */




const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    router.post('/', async (req, res) => {
        const { user_name} = req.body;
        try {
            const userID = await getUserID(user_name);
            const transactionTotal = await getTransactionTotal(userID);
            
            return res.status(200).json({transactions: transactionTotal});


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

    async function getTransactionTotal(userid) {
        const query = 'SELECT COUNT(*) FROM transactions WHERE user_id= $1;';
        const values = [userid];
        const result = await pool.query(query, values);
        return result.rows[0];
      }


      return router;
}

