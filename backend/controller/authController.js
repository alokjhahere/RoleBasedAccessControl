const { users } = require("../data/db");

exports.getMe = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
      },
    });
  } catch (error) {
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

    // 1. Validate input
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // 2. Find user from mock DB
    const user = users.find((u) => u.email === email);

    // 3. If user not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 4. Successful login
    return res.status(200).json({
      message: "Login successful",
      user,
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
