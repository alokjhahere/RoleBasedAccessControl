// In-memory mock database
// This data will reset when the server restarts

const permissions = [
  {
    id: 1,
    name: "CREATE_USER",
    description: "Can create new users",
  },
  {
    id: 2,
    name: "VIEW_DASHBOARD",
    description: "Can view dashboard",
  },
];

const roles = [
  {
    id: 1,
    name: "admin",
    permissions: [1, 2], // permission IDs
  },
  {
    id: 2,
    name: "user",
    permissions: [2],
  },
];

const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123", // later we will hash this
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
