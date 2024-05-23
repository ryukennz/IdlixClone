import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import ResetPasswordPage from "./views/ResetPasswordPage";
import WatchList from "./components/WatchList";
import { toast } from "react-toastify";
import token from "./utils/token";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (token) {
        toast.success("Login successfully");
        return redirect("/watch-list");
      }
      return null;
    },
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
      if (!token) {
        toast.info("Please log in to your account");
        return redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
