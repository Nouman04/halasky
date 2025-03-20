const express = require('express');
const router = express.Router();
const passport = require('passport');
const initializePassport = require('../config/passportConfig');
const JwtAuthentication = require('../config/jwtConfig'); 
const AuthController = require('../controllers/authController');

initializePassport(passport);

router.post('/login' , JwtAuthentication.login);
router.post('/register' , AuthController.register);
router.post('/verify-token' , AuthController.verifyToken);
router.post('/generate-token' , AuthController.generateToken);
router.post('/update-password' , AuthController.updatePassword);

module.exports = router;