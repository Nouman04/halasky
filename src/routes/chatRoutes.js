const express = require('express');
const router = express.Router();
const passport = require('passport');
const chatController = require('../controllers/chatController');

router.use(passport.authenticate('jwt', { session: false }));
router.post('/ask-question' , chatController.askQuestion);

module.exports = router;