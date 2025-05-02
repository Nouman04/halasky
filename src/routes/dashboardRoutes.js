const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController.js');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));
router.get('/get-information' , DashboardController.getDashboardInformation );

module.exports = router;