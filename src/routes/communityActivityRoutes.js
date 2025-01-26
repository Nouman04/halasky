const express = require('express');
const app = express();
const router = express.Router();
const CommunityActivityController = require('../controllers/communityAcitivityController');

const { dynamicUploader } = require('../Helpers/fileUploadHelper');
const upload = dynamicUploader('thumbnail');


router.post('/add' , upload.single('thumbnail') ,  CommunityActivityController.add );
router.put('/edit' , upload.single('thumbnail') ,  CommunityActivityController.edit );
router.post('/delete' , CommunityActivityController.delete );
router.post('/list' , CommunityActivityController.list );
router.put('/change-status' , CommunityActivityController.changeStatus );
router.put('/approval-status' , CommunityActivityController.changeApproval );
router.put('/change-restriction' , CommunityActivityController.updateRestriction );

module.exports = router;