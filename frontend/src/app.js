import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AuthForm from "./pages/AuthForm";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
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
