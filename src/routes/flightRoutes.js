const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const passport = require('passport');
const publicRoutes = [ '/list'  ,  '/airports' , '/get' , '/test-list' , '/alternate-days'];

router.use( (request ,response ,next)=>{

    if(publicRoutes.includes(request.path)){
        return next();
    }

    passport.authenticate('jwt' , {session: false})(request ,response ,next);
})

router.post('/get' ,   flightController.list );
router.post('/test-list' ,   flightController.testFlightList );
router.post('/availability' ,   flightController.findAvailability );
router.post('/generate-pnr' ,   flightController.generatePnr );
router.post('/airports' ,   flightController.airportList );
router.post("/alternate-days", flightController.searchAlternateDatesFlights);
router.get("/bookings", flightController.userBookings);
module.exports = router;