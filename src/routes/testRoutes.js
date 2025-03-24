const express = require('express');
const router = express.Router();
const TestController = require("../controllers/testController");

router.post('/flight' , TestController.flight);
router.get('/socket-test' , TestController.testSocketPage);

module.exports = router;