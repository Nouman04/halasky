const express = require('express');
const router = express.Router();
const faqcontroller = require('../controllers/faqController');

router.post('/add' ,   faqcontroller.add );
router.put('/edit' ,   faqcontroller.edit );
router.post('/delete' , faqcontroller.delete );
router.get('/list' , faqcontroller.list );

module.exports = router;