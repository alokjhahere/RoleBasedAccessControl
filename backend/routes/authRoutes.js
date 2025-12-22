const express = require("express");
const {
  registerController,
  loginController,
  getMe,
  updateMe,
} = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/me", authMiddleware, getMe); // get logged in user data
router.post("/me", authMiddleware, updateMe); // update logged in user data

module.exports = router;
