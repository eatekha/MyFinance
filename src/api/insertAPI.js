const express = require('express');
const router = express.Router();
const fs = require("fs");

const filePath = 'src/backend/userTransactions.json';
module.exports = (pool) => {


    router.post('/', async (req, res) => {
        try {
            const { user_name } = req.body;
    
            const userID = await getUserID(user_name);
    
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
            function insert() {
                for (const item of jsonData) {
                    insertTransaction( item.transaction,item.keyword, item.date, item.category, item.month, userID, item.amount);
                }
            }
    
            await insert();
            
            res.status(200).json({ message: 'Transactions inserted successfully' });
        } catch (error) {
            console.error('Error while processing request:', error);
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



  async function insertTransaction(transaction,keyword,  date, category, month, user_id, amount){
    const query = 'INSERT INTO transactions (transaction, keyword, date, category, month, user_id, amount) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [transaction, keyword, date, category, month, user_id, amount];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  return router;
}