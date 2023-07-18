const express = require('express');
const router = express.Router();

module.exports = (pool) => {

class User {
    constructor(username, userId) {
      this.username = username;
      this.userId = userId;
    }
  
    getUsername() {
      return this.username;
    }
  
    setUsername(username) {
      this.username = username;
    }
  
    setUserId(userId) {
      this.userId = userId;
    }
  }
  
  async function getUserID(user_name, user_password) {
    const query = 'SELECT user_id FROM usertable WHERE user_name = $1 AND user_password = $2';
    const values = [user_name, user_password];
    const result = await pool.query(query, values);
    user_id = result.rows[0].user_id;
    return user_id;
  }

  module.exports = User;
  
};
