const express = require('express');
const router = express.Router();
const CommonController = require('../controllers/commonController');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.post('/add-comment'  , CommonController.addComment );
router.put('/update-comment' , CommonController.updateComment );
router.post('/delete-comment' , CommonController.deleteComment );
router.post('/add-violation' , CommonController.addViolation );
router.put('/update-violation' , CommonController.updateViolation );
router.post('/delete-violation' , CommonController.deleteViolation );
router.post('/violation-list' , CommonController.listViolation );

module.exports = router;