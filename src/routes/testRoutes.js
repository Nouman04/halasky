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
router.get('/test-payment-gateway', TestController.testPaymentGatewayPage);

// New: auto-session checkout page + session API + direct pay
router.get('/geidea-checkout', TestController.geideaCheckoutPage);
router.get('/geidea/get-session', TestController.getGeideaSession);
router.post('/geidea/pay', TestController.geideaDirectPay);

module.exports = router;