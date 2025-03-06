const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const passport = require('passport');
const publicRoutes = [ '/list' ];

router.use( (request ,response ,next)=>{

    if(publicRoutes.includes(request.path)){
        next();
    }
    passport.authenticate('jwt' , {session: false})(request ,response ,next);
})

router.post('/get' ,   flightController.list );
router.post('/availability' ,   flightController.findAvailability );

module.exports = router;