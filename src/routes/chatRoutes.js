const express = require('express');
const passport = require('passport');
const chatController = require('../controllers/chatController');
const router = express.Router();
const publicRoutes = [ '/send-message' ];
module.exports = function(io , socketConnectedUser){
    // router.use( (request ,response ,next)=>{
    
    //     if (publicRoutes.includes(request.path)) {
    //         return next(); // Ensure that execution stops here
    //     }
    //     passport.authenticate('jwt', { session: false })(request, response, next);
    // })
    router.use(passport.authenticate('jwt', { session: false }));
    router.post('/ask-question' , chatController.askQuestion);
    router.post('/send-message' , (req , res) => chatController.sendMessage(req , res , io , socketConnectedUser));
    router.post('/ai-message' , chatController.aiMessages);
    router.post('/chat-message' , chatController.chatMessages);
    return router;
}