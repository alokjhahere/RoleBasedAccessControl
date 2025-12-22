const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  roleCreateController,
  roleGetController,
  roleDeleteController,
} = require("../controller/roleControllers");
const { checkPermission } = require("../middleware/checkPermission");

const router = express.Router();

// Create Roles
router.post(
  "/",
  authMiddleware,
  checkPermission("roles", "CREATE"),
  roleCreateController
);
// Get all Roles
router.get(
  "/",
  authMiddleware,
  checkPermission("roles", "READ"),
  roleGetController
);
// Delete Roles
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("roles", "DELETE"),
  roleDeleteController
);

module.exports = router;
