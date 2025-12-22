const { users, roles, permissions } = require("../data/db");

// ASSIGN ROLE TO USER (ADMIN ONLY)
exports.assignRoleToUserController = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(400).json({
        message: "userId and roleId are required",
      });
    }

    const user = users.find((u) => u.id === Number(userId));
    const role = roles.find((r) => r.id === Number(roleId));

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    user.roleId = role.id;

    return res.status(200).json({
      message: "Role assigned to user successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to assign role to user",
    });
  }
};

// ASSIGN PERMISSION TO ROLE (ADMIN ONLY)
exports.assignPermissionToRolesController = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    if (!roleId || !permissionId) {
      return res.status(400).json({
        message: "roleId and permissionId are required",
      });
    }

    const role = roles.find((r) => r.id === Number(roleId));
    const permission = permissions.find((p) => p.id === Number(permissionId));

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    if (!permission) {
      return res.status(404).json({
        message: "Permission not found",
      });
    }

    if (role.permissions.includes(permission.id)) {
      return res.status(409).json({
        message: "Permission already assigned to role",
      });
    }

    role.permissions.push(permission.id);

    return res.status(200).json({
      message: "Permission assigned to role successfully",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to assign permission to role",
    });
  }
};
