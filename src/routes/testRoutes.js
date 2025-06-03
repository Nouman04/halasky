const express = require('express');
const router = express.Router();
const TestController = require("../controllers/testController");

router.post('/flight' , TestController.flight);
router.get('/socket-test' , TestController.testSocketPage);
router.get('/test-invoice' , TestController.createPDF);
router.get('/test-hotel-invoice' , TestController.createHotelPDF);
module.exports = router;