import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AuthForm from "./pages/AuthForm";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Profile from "./pages/Profile";
import SideBar from "./components/SideBar";
useAuth;

const AppLayout = () => {
  const { token } = useAuth();
  const isLoggedIn = !!token;
  return (
    <div className="flex">
      {isLoggedIn && <SideBar />}
      <div className="flex-1">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <AuthForm mode="login" />,
      },
      {
        path: "/register",
        element: <AuthForm mode="register" />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <RouterProvider router={appRouter} />
  </AuthProvider>
);
