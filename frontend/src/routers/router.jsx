import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Home } from "../pages/home/home.jsx";
import { Login } from "../components/Login.jsx";
import SingleBook from "../pages/books/singleBook.jsx";
import ProtectedRoute from "./privateRoute.jsx"; // Make sure to import your ProtectedRoute
import Dashboard from "../pages/dashboard/Dashboard.jsx";

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
      {
        path: "/books/:book_id",
        element: <SingleBook />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
