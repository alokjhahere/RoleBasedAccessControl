// Assign Roles to Users & Permissions to Roles

const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { checkPermission } = require("../middleware/checkPermission");
const {
  assignPermissionToRolesController,
  assignRoleToUserController,
} = require("../controller/assignControllers");

const router = express.Router();

// Assign role to user
router.post(
  "/role-to-user",
  authMiddleware,
  checkPermission("roles", "ASSIGN"),
  assignRoleToUserController
);

// Assign permission to role
router.post(
  "/permission-to-role",
  authMiddleware,
  checkPermission("permissions", "ASSIGN"),
  assignPermissionToRolesController
);

module.exports = router;
