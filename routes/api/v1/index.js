const express = require('express');
const router = express.Router();

//import controller
const { index, test } = require('../../../controllers/index_controller');

//import jwt functions
const { verifyToken } = require('../../../config/jwtauth');

//index route
router.get('/', index);
//test route (Protected);
router.get('/test', verifyToken, test);

//export router
module.exports = router;