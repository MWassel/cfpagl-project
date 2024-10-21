import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Home } from "../pages/home/home.jsx";
import { Login } from "../components/login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
