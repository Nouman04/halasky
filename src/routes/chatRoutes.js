const express = require('express');
const passport = require('passport');
const chatController = require('../controllers/chatController');
const router = express.Router();

module.exports = function(io){
    router.use(passport.authenticate('jwt', { session: false }));
    router.post('/ask-question' , chatController.askQuestion);
    router.post('/send-message' , (req , res) => chatController.sendMessage(req , res , io));

    return router;
}