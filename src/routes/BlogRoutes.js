const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');
const { dynamicUploader } = require('../Helpers/fileUploadHelper');
const upload = dynamicUploader('thumbnail');

const passport = require('passport');
const publicRoutes = [ '/list' , '/detail' ];
router.use( (request ,response ,next)=>{

    if (publicRoutes.includes(request.path)) {
        return next(); // Ensure that execution stops here
    }
    passport.authenticate('jwt', { session: false })(request, response, next);
})

router.post('/add' , upload.single('thumbnail') ,  BlogController.add );
router.put('/edit' , upload.single('thumbnail') ,  BlogController.edit );
router.post('/delete' , BlogController.delete );
router.post('/list' , BlogController.list );
router.put('/change-status' , BlogController.changeStatus );
router.put('/detail' , BlogController.detail );

module.exports = router;