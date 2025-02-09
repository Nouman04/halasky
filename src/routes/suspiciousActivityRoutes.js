const express = require('express');
const router = express.Router();
const SuspiciousActivityController = require('../controllers/suspiciousActivityController');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.put('/update-ip-status'  , SuspiciousActivityController.updateIp );
router.post('/get-suspicious-ips' , SuspiciousActivityController.getIps );

module.exports = router;