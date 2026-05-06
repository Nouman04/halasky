const express = require('express');
const router = express.Router();
const TestController = require("../controllers/testController");

router.post('/flight' , TestController.flight);
router.get('/socket-test' , TestController.testSocketPage);
router.get('/test-invoice' , TestController.createPDF);
router.get('/test-hotel-invoice' , TestController.createHotelPDF);
router.get('/create-uuid' , TestController.createUuid);

// Geidea Payment Test Routes
router.get('/geidea-payment', TestController.geideaPaymentPage);
router.post('/geidea/create-session', TestController.createGeideaSession);
router.post('/geidea/callback', TestController.geideaCallback);

module.exports = router;