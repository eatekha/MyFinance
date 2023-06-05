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