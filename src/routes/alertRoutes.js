const express = require('express');
const router = express.Router();
const AlertController = require('../controllers/AlertController');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.post('/list', AlertController.list);

module.exports = router;
