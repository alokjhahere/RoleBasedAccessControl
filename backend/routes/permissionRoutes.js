const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { checkPermission } = require("../middleware/checkPermission");
const {
  createPermissionController,
  getPermissionController,
} = require("../controller/permissionControllers");

const router = express.Router();

// CREATE PERMISSION
router.post(
  "/",
  authMiddleware,
  checkPermission("permissions", "CREATE"),
  createPermissionController
);

// GET ALL PERMISSIONS
router.get(
  "/",
  authMiddleware,
  checkPermission("permissions", "READ"),
  getPermissionController
);

module.exports = router;
