const { Router } =  require('express');
const {
  createUser,
  loginUser
} = require("../controllers/users.controller.js");

const { 
  validateCreate,
  validateLogin
} = require('../validators/users.js');

const router = Router();

router.post( "/", [validateCreate], createUser );
router.post( "/login", [validateLogin], loginUser );

module.exports = router;