const express = require("express");
const app = express();
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/roles-list", UserController.getRoleslist);
router.post("/status", UserController.userStatus);
router.post("/search", UserController.searchUser);
router.put("/update-password", UserController.updateAccountPassword);
router.post("/account-detail", UserController.userAccountDetail);
router.post("/get-members", UserController.getMembers);
router.post("/get-role-members", UserController.getRoleMembers);
router.put("/update-role", UserController.updateUserRole);
router.post("/add-member", UserController.addMember);
router.post("/add-recovery-request", UserController.userRecoveryRequest);
router.post("/recovery-request-list", UserController.getRecoveryRequests);
router.post("/roles-list", UserController.getRoles);
router.put("/update-recovery-request", UserController.updateRecoveryRequest);

module.exports = router;
