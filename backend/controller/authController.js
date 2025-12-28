const jwt = require("jsonwebtoken");

const { users, roles, permissions } = require("../data/db");

exports.getMe = (req, res) => {
  try {
    // user is already attached by authMiddleware (JWT)
    const user = req.user;

    // 1. Find user's role
    const role = roles.find((r) => r.id === user.roleId);

    if (!role) {
      return res.status(404).json({
        message: "Role not found for user",
      });
    }

    // 2. Resolve permissions for that role
    const resolvedPermissions = role.permissions
      .map((permId) => permissions.find((p) => p.id === permId))
      .filter(Boolean); // safety

    // 3. Send clean RBAC-ready response
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: {
          id: role.id,
          name: role.name,
          permissions: resolvedPermissions,
        },
      },
    });
  } catch (error) {
    console.error("getMe error:", error);
    return res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const user = req.user; // attached by authMiddleware
    const { name, email } = req.body;

    // Prevent empty update
    if (!name && !email) {
      return res.status(400).json({
        message: "Nothing to update",
      });
    }

    // Update allowed fields only
    if (name) user.name = name;
    if (email) user.email = email;

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 🔐 Create JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      roleId: 2, // default role = user
    };

    users.push(newUser);

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
