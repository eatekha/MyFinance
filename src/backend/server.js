//import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

//Load environment variables from .env file
dotenv.config();
// Create Express app
const app = express();

//Set up port
const PORT = process.env.PORT || 4000;

//Configure CORS, json, cookies
const corsOptions = { credentials: true, origin: process.env.URL || '*' };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Connecting to Database
const { Pool } = require('pg');
const pass = require('../password');
const pool = new Pool({
  user: 'postgres',
  password: pass,
  host: 'localhost',
  port: 5432,
  database: 'userDatabase'
});

//Register Route
app.use('/register', require('../routes/register')(pool));
app.use('/login', require('../routes/login')(pool));

const initializePool = async () => {
  await pool.connect();
  console.log('Connected to the PostgreSQL database.');
};

const closePool = async () => {
  await pool.end();
  console.log('Closed the PostgreSQL database connection pool.');
};

module.exports = { pool, app };


//Connection confirmation
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

