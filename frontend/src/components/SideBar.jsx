import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { id: 1, name: "Dashboard", icon: "📊", link: "/home" },
    { id: 2, name: "Profile", icon: "👤", link: "/profile" },
  ];

  // Admin-only menu
  if (user?.role?.name === "admin") {
    menuItems.push({
      id: 3,
      name: "Admin",
      icon: "🛠️",
      link: "/admin",
    });
  }

  return (
    <div className="w-60 min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">RBAC Panel</h2>

      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="mt-10 w-full bg-red-500 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default SideBar;
