const express = require('express');
const router = express.Router();
const SettingsController = require('../controllers/paymentController');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.post('/create-payment-detail'  , SettingsController.getPaymentDetail );

module.exports = router;