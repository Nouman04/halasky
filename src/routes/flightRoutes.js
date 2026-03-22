const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const passport = require('passport');
const publicRoutes = ['/list', '/airports', '/get', '/test-list', '/alternate-days', '/separate-flights'];

router.use((request, response, next) => {

    if (publicRoutes.includes(request.path)) {
        return next();
    }

    passport.authenticate('jwt', { session: false })(request, response, next);
})

router.post('/get', flightController.list);
router.post('/availability', flightController.checkAvailability);
router.post('/generate-pnr', flightController.generatePnr);
router.post('/airports', flightController.airportList);
router.post("/alternate-days", flightController.searchAlternateDatesFlights);
router.get("/bookings", flightController.userBookings);
router.post('/generate-booking', flightController.createBooking);
router.post('/generate-test-booking', flightController.createBookingTest);
router.post('/separate-flights', flightController.separateFlightList);
router.post('/cancel-booking', flightController.cancelBooking);


router.post('/order-ticketing', flightController.orderFulfillment);

module.exports = router;