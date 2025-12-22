const { roles, permissions } = require("../data/db");

exports.checkPermission = (resource, action) => {
  return async (req, res, next) => {
    try {
      const user = req.user; // set by authMiddleware

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      // 1. Find user's role
      const role = roles.find((r) => r.id === user.roleId);

      if (!role) {
        return res.status(403).json({
          message: "Role not found",
        });
      }

      // 2. Get permissions of role
      const rolePermissions = permissions.filter((p) =>
        role.permissions.includes(p.id)
      );

      // 3. Check required permission
      const hasPermission = rolePermissions.some(
        (p) => p.resource === resource && p.action === action
      );

      if (!hasPermission) {
        return res.status(403).json({
          message: "Forbidden: insufficient permissions",
        });
      }

      next(); // permission granted
    } catch (error) {
      return res.status(500).json({
        message: "Permission check failed",
      });
    }
  };
};
