const { User } = require("../database/models");
const { Role } = require("../database/models");
const { RecoveryRequest } = require("../database/models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const appConst = require("../appConst");
const validator = require("validator");

module.exports = {
  getRoleslist: async (request, response) => {
    try {
      let roles = await Role.findAll();
      return response.status(200).json({
        status: true,
        data: roles,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  userStatus: async (request, response) => {
    try {
      const { pageNo, status } = request.body;

      if (!validator.isInt(pageNo.toString(), { min: 1 })) {
        return response.status(400).json({
          status: false,
          message: "Invalid page number",
        });
      }

      if (status !== 0 && status !== 1) {
        return response.status(400).json({
          status: false,
          message: "Invalid status. Must be 0 (non-active) or 1 (active)",
        });
      }

      let skip = (parseInt(pageNo) - 1) * 10;

      const users = await User.findAll({
        include: {
          model: Role,
          where: { name: "user" },
          required: true,
        },
        where: { status: status },
        offset: skip,
        limit: 10,
      });

      return response.status(200).json({
        status: true,
        data: users,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  searchUser: async (request, response) => {
    try {
      const { searchQuery } = request.body;

      if (!validator.isLength(searchQuery || "", { min: 1 })) {
        return response.status(400).json({
          status: false,
          message: "Invalid search query",
        });
      }

      const searchedUsers = await User.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${searchQuery}%` } },
            { email: { [Op.like]: `%${searchQuery}%` } },
          ],
        },
        limit: 10,
      });

      if (searchedUsers.length === 0) {
        return response.status(200).json({
          status: true,
          data: [],
          message: "No user found!",
        });
      }

      return response.status(200).json({
        status: true,
        data: searchedUsers,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  updateAccountPassword: async (request, response) => {
    try {
      const userId = request.body.id;
      const password = request.body.password;

      if (!validator.isInt(userId)) {
        return response.status(400).json({
          status: false,
          message: "Invalid user ID",
        });
      }

      if (!password) {
        return response.status(400).json({
          status: false,
          message: "Password is required",
        });
      }

      const saltcount = 10;
      const hashedPassword = await bcrypt.hash(password, saltcount);

      await User.update(
        { password: hashedPassword },
        { where: { id: userId } }
      );

      return response.status(200).json({
        status: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  },

  userAccountDetail: async (request, response) => {
    try {
      const userId = request.body.id;

      if (!validator.isInt(userId)) {
        return response.status(400).json({
          status: false,
          message: "Invalid user ID",
        });
      }

      const user = await User.findOne({
        where: { id: userId },
      });

      if (!user) {
        return response.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      return response.status(200).json({
        status: true,
        data: user,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  getMembers: async (request, response) => {
    try {
      const pageNo = request.body.pageNo;
      const status = request.body.status;

      if (!validator.isInt(pageNo, { min: 1 })) {
        return response.status(400).json({
          status: false,
          message: "Invalid page number",
        });
      }

      if (!validator.isIn(status.toString(), ["0", "1"])) {
        return response.status(400).json({
          status: false,
          message: "Invalid status value",
        });
      }

      const skip = (parseInt(pageNo) - 1) * 10;
      const activeMembers = await User.findAll({
        include: {
          model: Role,
          where: {
            name: {
              [Op.in]: ["admin", "support_staff"],
            },
          },
          required: true,
        },
        where: {
          status: status, // This is now on the `User` model, not inside `Role` association.
        },
        offset: skip,
        limit: 10,
      });

      return response.status(200).json({
        status: true,
        data: activeMembers,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  getRoleMembers: async (request, response) => {
    try {
      const pageNo = request.body.pageNo;
      const roleId = request.body.roleId;
      const status = request.body.status;

      if (!validator.isInt(pageNo, { min: 1 })) {
        return response.status(400).json({
          status: false,
          message: "Invalid page number",
        });
      }

      if (!validator.isUUID(roleId)) {
        return response.status(400).json({
          status: false,
          message: "Invalid role ID",
        });
      }

      if (!validator.isIn(status.toString(), ["0", "1"])) {
        return response.status(400).json({
          status: false,
          message: "Invalid status value",
        });
      }

      const skip = (parseInt(pageNo) - 1) * 10;
      const members = await User.findAll({
        where: {
          status: status,
        },
        include: {
          model: Role,
          where: {
            id: roleId,
          },
          required: true,
        },
        offset: skip,
        limit: 10,
      });

      return response.status(200).json({
        status: true,
        data: members,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  updateUserRole: async (request, response) => {
    try {
      const userId = request.body.userId;
      const roleId = request.body.roleId;

      if (!validator.isInt(userId)) {
        return response.status(400).json({
          status: false,
          message: "Invalid user ID",
        });
      }

      if (!validator.isInt(userId)) {
        return response.status(400).json({
          status: false,
          message: "Invalid role ID",
        });
      }

      await Role.update({ role_id: roleId }, { where: { user_id: userId } });

      return response.status(200).json({
        status: true,
        message: "User role updated successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  addMember: async (request, response) => {
    try {
      const name = request.body.name;
      const email = request.body.email;
      const roleId = request.body.roleId;

      if (!validator.isLength(name || "", { min: 1 })) {
        return response.status(400).json({
          status: false,
          message: "Name is required",
        });
      }

      if (!validator.isEmail(email)) {
        return response.status(400).json({
          status: false,
          message: "Invalid email address",
        });
      }

      if (!validator.isInt(roleId)) {
        return response.status(400).json({
          status: false,
          message: "Invalid role ID",
        });
      }

      const userCount = await User.count({
        where: {
          email: email,
        },
      });

      if (userCount) {
        return response.status(400).json({
          status: false,
          message: "User already exists with the same email",
        });
      }

      const member = await User.create({
        status: 1,
        email: email,
        name: name,
      });

      await Role.create({
        role_id: roleId,
        user_id: member.id,
      });

      return response.status(200).json({
        status: true,
        message: "Member added successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  userRecoveryRequest: async (request, response) => {
    try {
      const email = request.body.email;

      if (!validator.isEmail(email)) {
        return response.status(400).json({
          status: false,
          message: "Invalid email address",
        });
      }

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return response.status(404).json({
          status: false,
          message: "No user exists with this email",
        });
      }

      if (user.status == 1) {
        return response.status(400).json({
          status: false,
          message: "User is already active",
        });
      }

      await RecoveryRequest.create({
        user_id: user.id,
        status: 0,
      });

      return response.status(200).json({
        status: true,
        message: "Recovery request added successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  getRecoveryRequests: async (request, response) => {
    try {
      let skip = (parseInt(request.body.pageNo) - 1) * 10;
      let requestStatus = request.body.status;

      if (!requestStatus) {
        requestStatus = appConst.requestPending;
      }

      let userRecoveryRequest = await User.findAll({
        where: {
          status: 0,
        },
        include: {
          model: RecoveryRequest,
          where: {
            status: requestStatus,
          },
          required: true,
          as: "user",
        },
        offset: skip,
        limit: 10,
      });
      return response.status(200).json({
        status: true,
        data: userRecoveryRequest,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  getRoles: async (request, response) => {
    try {
      let roles = await Role.findAll({
        include: {
          model: Permission,
        },
      });

      return response.status(200).json({
        status: true,
        data: roles,
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  updateRecoveryRequest: async (request, response) => {
    try {
      let userId = request.body.id;
      let status = request.body.status;
      RecoveryRequest.update(
        { status: status },
        {
          where: {
            userId: userId,
            status: appConst.recoveryPending,
          },
        }
      );

      return response.status(200).json({
        status: true,
        message: "Recovery request updated successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },
};
