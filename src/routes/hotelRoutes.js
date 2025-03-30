const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const passport = require("passport");
const publicRoutes = ["/list" , "/locations" , "/get" , "/detail" , "/images"];

router.use( (request ,response ,next)=>{

    if(publicRoutes.includes(request.path)){
        return next();
    }
    passport.authenticate('jwt' , {session: false})(request ,response ,next);
})

router.post("/get", hotelController.list);
router.post("/get/trending", hotelController.trending);
router.post("/locations", hotelController.locationList);
router.post("/detail", hotelController.hotelDetail); 
router.post("/images", hotelController.images);
router.post("/confirm-rate", hotelController.confirmRate);
// router.post('/availability' ,   hotelController.findAvailability );

module.exports = router;
