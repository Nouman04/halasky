const express = require('express');
const router = express.Router();
const faqcontroller = require('../controllers/faqController');

const publicRoutes = [ '/list' ];

router.use( (request ,response ,next)=>{

    console.log(request.path);
    if(publicRoutes.includes(request.path)){
        next();
    }
    passport.authenticate('jwt' , {session: false})(request ,response ,next);
})

router.post('/add' ,   faqcontroller.add );
router.put('/edit' ,   faqcontroller.edit );
router.post('/delete' , faqcontroller.delete );
router.get('/list' , faqcontroller.list );

module.exports = router;