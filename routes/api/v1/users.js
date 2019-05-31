const express = require('express');
const router = express.Router();

//load controller file
const { register, login } = require('../../../controllers/users_controller');

//signup route
router.post('/register', register);
//login route
router.post('/login', login);

//export router
module.exports = router;
