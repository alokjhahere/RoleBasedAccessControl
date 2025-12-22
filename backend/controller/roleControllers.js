const { roles } = require("../data/db");

// CREATE ROLE
exports.roleCreateController = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    if (!name || !permissions) {
      return res.status(400).json({
        message: "Role name and permissions are required",
      });
    }

    const newRole = {
      id: roles.length + 1,
      name,
      permissions, // array of permission IDs
    };

    roles.push(newRole);

    return res.status(201).json({
      message: "Role created successfully",
      role: newRole,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create role",
    });
  }
};

// GET ALL ROLES
exports.roleGetController = async (req, res) => {
  try {
    return res.status(200).json({
      roles,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch roles",
    });
  }
};

// DELETE ROLE
exports.roleDeleteController = async (req, res) => {
  try {
    const { id } = req.params;

    const index = roles.findIndex((r) => r.id === Number(id));

    if (index === -1) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    roles.splice(index, 1);

    return res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete role",
    });
  }
};
