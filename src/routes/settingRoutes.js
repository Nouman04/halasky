const express = require("express");
const router = express.Router();
const SettingsController = require("../controllers/settingsController");
const { dynamicUploader } = require("../Helpers/fileUploadHelper");
const upload = dynamicUploader("about");

router.put("/update-settings", SettingsController.updateSetting);
router.put(
  "/update-about-settings",
  upload.array("images"),
  SettingsController.updateAboutInformation
);
router.get("/get-settings", SettingsController.getSettings);
router.get("/get-about-settings", SettingsController.getAboutSettings);

module.exports = router;
