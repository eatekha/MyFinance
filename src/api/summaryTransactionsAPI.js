/**
 * This function takes in the user_name and returns an array of f
 * Total User Earnings
 * Total User Expenses
 * Total Transactions
 * 
 * 
 * 
 * Edit it so Month == X
 */




const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    router.post('/', async (req, res) => {
        const { user_name, month} = req.body;

        try {
            const userID = await getUserID(user_name);
            const totalEarnings = await getTotalEarnings(userID, month);
            const totalExpenses = await getTotalExpenses(userID, month);
            const transactionNumber = await getTransactionNumber(userID, month);

            if (totalEarnings !== 0) {return res.status(200).json(
                
                { "Earnings": totalEarnings,
                    "Expenses": totalExpenses,
                    "TotalTransactions": transactionNumber
                
                }
                
                
                
                );}

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

    async function getTotalExpenses(userid, month) {
        const query = 'SELECT SUM(amount) AS total_negative_amount FROM transactions WHERE user_id= $1 AND amount < 0 AND month= $2;';
        const values = [userid, month];
        const result = await pool.query(query, values);
        return result.rows[0];
      }

      async function getTotalEarnings(userid, month) {
        const query = 'SELECT SUM(amount) AS total_positive_amount FROM transactions WHERE user_id= $1 AND amount > 0 AND month= $2;';
        const values = [userid,month];
        const result = await pool.query(query, values);
        return result.rows[0];
      }

      async function getTransactionNumber(userid, month) {
        const query = 'SELECT COUNT(*) FROM transactions WHERE user_id =$1 AND month= $2;';
        const values = [userid, month];
        const result = await pool.query(query, values);
        return result.rows[0];
      }
      return router;
}

