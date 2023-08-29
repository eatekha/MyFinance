/*
This file is the starting point of the server
*/



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
app.use('/register', require('../api/registerAPI')(pool));
app.use('/login', require('../api/loginAPI')(pool));
app.use('/summaryTransactions', require('../api/summaryTransactionsAPI')(pool));
app.use('/transactionsChart', require('../api/transactionsChartAPI')(pool));
app.use('/totalProjects', require('../api/totalProjectsAPI')(pool));
app.use('/pieChart', require('../api/pieChartAPI')(pool));
app.use('/insert', require('../api/insertAPI')(pool));
app.use('/transactionTable', require('../api/transactionTableAPI')(pool));




/*app.use('/transactionsChart', require('../api/transactionsChartAPI')(pool));

app.use('/summaryEarnings', require('../api/summaryEarningsAPI')(pool));
app.use('/summaryExpenses', require('../api/summaryExpensesAPI')(pool));
app.use('/transactionNumber', require('../api/transactionNumberAPI')(pool));
*/


//app.use('/userID', require('../api/userAPI')(pool));


const initializePool = async () => {
  await pool.connect();
  console.log('Connected to the PostgreSQL database.');
};

const closePool = async () => {
  await pool.end();
  console.log('Closed the PostgreSQL database connection pool.');
};

module.exports = { pool, app };

initializePool();

//Connection confirmation
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

