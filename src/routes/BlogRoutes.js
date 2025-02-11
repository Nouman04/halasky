const express = require("express");
const app = express();
const router = express.Router();
const BlogController = require("../controllers/blogController");
const { dynamicUploader } = require("../Helpers/fileUploadHelper");
const upload = dynamicUploader("thumbnail");

router.post("/add", upload.single("thumbnail"), BlogController.add);
router.put("/edit", upload.single("thumbnail"), BlogController.edit);
router.post("/delete", BlogController.delete);
router.post("/list", BlogController.list);
router.put("/change-status", BlogController.changeStatus);

module.exports = router;
