import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import Card from "./components/Card";

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
    element: <Card />,
  },
]);

export default router;
