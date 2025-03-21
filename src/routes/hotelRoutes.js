const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const passport = require("passport");
const publicRoutes = ["/list" , "/locations"];

router.use((request, response, next) => {
  if (publicRoutes.includes(request.path)) {
    next();
  }
  passport.authenticate("jwt", { session: false })(request, response, next);
});

router.post("/get", hotelController.list);
router.post("/get/trending", hotelController.trending);
router.post("/locations", hotelController.locationList);
// router.post('/availability' ,   hotelController.findAvailability );

module.exports = router;
