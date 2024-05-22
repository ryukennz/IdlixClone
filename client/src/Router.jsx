import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import ResetPasswordPage from "./views/ResetPasswordPage";

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
]);

export default router;
