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
            last6monthsArray = getLast6MonthsArray();

            const data = [];

            for (var month of last6monthsArray){
              month = month.split(' ')[0]

              const expenses = await getTotalExpenses(userID, month);
              const earnings = await getTotalEarnings(userID, month);
      
              data.push({
                month: month,
                expenses: expenses.total_negative_amount/-1 || 0,
                earnings: earnings.total_positive_amount/1 || 0
              });

            }      
            
            return res.status(200).json(data);


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
        const query = 'SELECT SUM(amount) AS total_negative_amount FROM transactions WHERE user_id= $1 AND amount < 0 AND month=$2;';
        const values = [userid, month];
        const result = await pool.query(query, values);
        return result.rows[0];
      }

      async function getTotalEarnings(userid, month) {
        const query = 'SELECT SUM(amount) AS total_positive_amount FROM transactions WHERE user_id= $1 AND amount > 0 AND month=$2;';
        const values = [userid, month];
        const result = await pool.query(query, values);
        return result.rows[0];
            }


        function getLast6MonthsArray() {
          const today = new Date();
          const monthsArray = [];
        
          for (let i = 5; i >= 0; i--) {
            const targetMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);
            monthsArray.push(targetMonth.toLocaleString('default', { month: 'long', year: 'numeric' }));
          }
        
          return monthsArray;
        }      


      return router;
}

