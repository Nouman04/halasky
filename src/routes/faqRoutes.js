const express = require("express");
const app = express();
const router = express.Router();
const faqController = require("../controllers/faqController");

router.post("/add", faqController.add);
router.put("/edit", faqController.edit);
router.post("/delete", faqController.delete);
router.get("/list", faqController.list);

module.exports = router;
