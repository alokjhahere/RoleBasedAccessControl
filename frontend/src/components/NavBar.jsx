import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      <div className="flex gap-4 items-center">
        <Link to="/home" className="font-semibold hover:text-gray-300">
          RBAC App
        </Link>

        <Link to="/home" className="hover:text-gray-300">
          Home
        </Link>

        {user && (
          <Link to="/profile" className="hover:text-gray-300">
            Profile
          </Link>
        )}

        {/* Admin-only link */}
        {user && user.roleId === 1 && (
          <Link to="/admin" className="hover:text-gray-300">
            Admin
          </Link>
        )}
      </div>

      <div className="flex gap-4 items-center">
        {!user && (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
