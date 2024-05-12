import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
