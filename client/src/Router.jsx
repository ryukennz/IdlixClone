import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import ResetPasswordPage from "./views/ResetPasswordPage";
import WatchList from "./components/WatchList";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/reset-password/:id/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/watch-list",
    element: <WatchList />,
    loader: () => {
      const token = localStorage.getItem("user_authentication");
      if (!token) throw redirect("/login");
      return null;
    },
  },
]);

export default router;
