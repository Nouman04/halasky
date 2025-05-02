const express = require('express');
const router = express.Router();
const passport = require('passport');
const initializePassport = require('../config/passportConfig');
const JwtAuthentication = require('../config/jwtConfig'); 
const AuthController = require('../controllers/authController');
const { dynamicUploader } = require('../Helpers/fileUploadHelper');
const upload = dynamicUploader('image');

initializePassport(passport);

router.post('/login' , JwtAuthentication.login);
router.post('/register' , upload.single('image') ,AuthController.register);
router.post('/verify-token' , AuthController.verifyToken);
router.post('/verify-native-token' , JwtAuthentication.verifyNativeToken);
router.post('/generate-token' , AuthController.generateToken);
router.post('/update-password' , AuthController.updateForgotPassword);


module.exports = router;