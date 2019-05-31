const mongoose = require('mongoose');

require('dotenv').config();

//import database url
const dburl = process.env.MONGO_URI;
//map global promise
mongoose.Promise = global.Promise;
//db Connection
mongoose.connect(dburl, { useNewUrlParser: true }).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => console.log(err));