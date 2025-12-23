import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="p-4 flex space-x-6 bg-gray-800 text-white">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-400 font-semibold"
            : "hover:text-yellow-300 transition-colors"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-400 font-semibold"
            : "hover:text-yellow-300 transition-colors"
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-400 font-semibold"
            : "hover:text-yellow-300 transition-colors"
        }
      >
        Register
      </NavLink>
    </header>
  );
};

export default NavBar;
