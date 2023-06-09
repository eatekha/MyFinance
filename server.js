//Stuff that needs to be imported
const express = require('express');
const { json } = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { dirname, join } = require('path');
const path = require('path');
dotenv.config();


//express declared using constant app
const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = {credentials:true, origin: process.env.URL || '*'};

//
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

//
app.use('/', express.static(join(__dirname, 'public')));
app.listen(PORT, ()=>console.log(`Server is listening on ${PORT}`));

//Main Page
app.get('/', (req, res) => {
  res.send('Handling Main Page');
});


//Connecting Database
const { Pool } = require("pg");
const pass = require('./password');

const pool = new Pool({
  user: "postgres",
  password: pass,
  host: "localhost",
  port: 5432,
  database: "userDatabase"
});

app.post('/register', (req, res) => {
  const { user_name, user_password } = req.body;

  // Insert user data into the database
  pool.query('INSERT INTO usertable (user_name, user_password) VALUES ($1, $2)', [user_name, user_password])
    .then(() => {
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});


//Register Page