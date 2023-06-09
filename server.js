//Stuff that needs to be imported
const express = require('express');
const { json } = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();


//Declarations
const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = { credentials: true, origin: process.env.URL || '*' };
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());


//Connecting to Database
const { Pool } = require("pg");
const pass = require('./password');
const pool = new Pool({
  user: "postgres",
  password: pass,
  host: "localhost",
  port: 5432,
  database: "userDatabase"
});


//Register Route 
const registerUser = require('./routes/registerRoute');
app.post('/register', registerUser);


//Login Route
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
