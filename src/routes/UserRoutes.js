const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.get('/roles-list' , UserController.getRoleslist );
router.get('/status-list' , UserController.statusList );
router.post('/update-status' , UserController.updateAccountStatus );
router.post('/active' , UserController.activeUser );
router.post('/non-active' , UserController.nonActiveUser );
router.post('/search' , UserController.searchUser );
router.put('/update-password' , UserController.updateAccountPassword );
router.post('/account-detail' , UserController.userAccountDetail );
router.post('/get-members' , UserController.getMembers);
router.post('/get-role-members' , UserController.getRoleMembers);
router.put('/update-role' , UserController.updateUserRole);
router.post('/add-member' , UserController.addMember);
router.post('/add-recovery-request' , UserController.userRecoveryRequest);
router.post('/recovery-request-list' , UserController.getRecoveryRequests);
router.get('/roles-list' , UserController.getRoles);
router.put('/update-recovery-request' , UserController.updateRecoveryRequest);

module.exports = router;