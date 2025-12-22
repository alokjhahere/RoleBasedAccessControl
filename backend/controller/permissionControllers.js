const { permissions } = require("../data/db");

// CREATE PERMISSION (ADMIN ONLY)
exports.createPermissionController = async (req, res) => {
  try {
    const { resource, action, description } = req.body;

    if (!resource || !action) {
      return res.status(400).json({
        message: "Resource and action are required",
      });
    }

    const exists = permissions.find(
      (p) => p.resource === resource && p.action === action
    );

    if (exists) {
      return res.status(409).json({
        message: "Permission already exists",
      });
    }

    const newPermission = {
      id: permissions.length + 1,
      resource,
      action,
      description: description || "",
    };

    permissions.push(newPermission);

    return res.status(201).json({
      message: "Permission created successfully",
      permission: newPermission,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create permission",
    });
  }
};

// GET ALL PERMISSIONS (ADMIN ONLY)
exports.getPermissionController = async (req, res) => {
  try {
    return res.status(200).json({
      permissions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch permissions",
    });
  }
};
