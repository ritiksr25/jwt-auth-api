const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//configurations
require('dotenv').config();
require('./config/jwtauth');
require('./config/dbconnection');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load User model
const User = require('./models/User');

//routes
app.use('/api/v1', require('./routes/api/v1/index'));
app.use('/api/v1/users', require('./routes/api/v1/users'));

//Setting up Server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if(err) throw err;
    else console.log(`Server is up and running on Port ${PORT}`);
})

