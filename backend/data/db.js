// In-memory mock database
// This data resets when the server restarts

const permissions = [
  // ROLE MANAGEMENT
  {
    id: 1,
    resource: "roles",
    action: "CREATE",
    description: "Can create roles",
  },
  {
    id: 2,
    resource: "roles",
    action: "READ",
    description: "Can read roles",
  },
  {
    id: 3,
    resource: "roles",
    action: "DELETE",
    description: "Can delete roles",
  },

  // USER SELF ACCESS
  {
    id: 4,
    resource: "profile",
    action: "READ",
    description: "Can view own profile",
  },
  {
    id: 5,
    resource: "profile",
    action: "UPDATE",
    description: "Can update own profile",
  },

  {
    id: 6,
    resource: "permissions",
    action: "CREATE",
    description: "Can create permissions",
  },
  {
    id: 7,
    resource: "permissions",
    action: "READ",
    description: "Can read permissions",
  },
];

const roles = [
  {
    id: 1,
    name: "admin",
    permissions: [1, 2, 3, 4, 5, 6, 7], // full access
  },
  {
    id: 2,
    name: "user",
    permissions: [4, 5], // only self profile access
  },
];

const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    roleId: 1, // admin
  },
  {
    id: 2,
    name: "Normal User",
    email: "user@test.com",
    password: "user123",
    roleId: 2, // user
  },
];

module.exports = {
  users,
  roles,
  permissions,
};
