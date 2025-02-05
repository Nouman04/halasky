const express = require('express');
const app = express();
const router = express.Router();
const customerQueryController = require('../controllers/customerQueryController');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.post('/add' ,   customerQueryController.addQuery );
router.put('/edit' ,  customerQueryController.editQuery );
router.put('/update-status' , customerQueryController.updateStatus );
router.put('/update-priority' , customerQueryController.updatePriority );
router.post('/delete-query' ,   customerQueryController.deleteQuery );
router.post('/list' , customerQueryController.list );
router.post('/add-feedback' ,   customerQueryController.addFeedback );
router.put('/update-feedback' , customerQueryController.updateFeedback );
router.post('/delete-feedback' , customerQueryController.deleteFeedback );
router.post('/feedback-list' , customerQueryController.feedbackList );

module.exports = router;