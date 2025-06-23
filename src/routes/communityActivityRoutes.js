const express = require("express");
const app = express();
const router = express.Router();
const CommunityActivityController = require("../controllers/communityAcitivityController");
const passport = require("passport");

const { dynamicUploader } = require("../Helpers/fileUploadHelper");
const { route } = require("./userRoutes");
const upload = dynamicUploader("thumbnail");

router.use(passport.authenticate("jwt", { session: false }));

router.post("/add", upload.single("thumbnail"), CommunityActivityController.add);
router.put( "/edit", upload.single("thumbnail"), CommunityActivityController.edit);
router.post("/delete", CommunityActivityController.delete);
router.post("/list", CommunityActivityController.list);
router.put("/change-status", CommunityActivityController.changeStatus);
router.put("/approval-status", CommunityActivityController.changeApproval);
router.put( "/change-restriction", CommunityActivityController.updateRestriction);
router.put( "/update-activity-action", CommunityActivityController.toggleActivityAction);
router.post("/get-activity-action", CommunityActivityController.getUserActivities);



router.post("/create-poll", CommunityActivityController.createPoll);
router.put("/add-poll-answer", CommunityActivityController.submitPollAnswer);
router.get("/poll-result/:questionId", CommunityActivityController.getPollResults);
router.get( "/community-activity-with-poll/:postId", CommunityActivityController.getCommunityActivityWithPoll );
router.get( "/popular-tags", CommunityActivityController.popularTags );

module.exports = router;
