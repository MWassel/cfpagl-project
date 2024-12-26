import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Home } from "../pages/home/home.jsx";
import { Login } from "../components/Login.jsx";
import SingleBook from "../pages/books/singleBook.jsx";
import ProtectedRoute from "./privateRoute.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import ManageBooks from "../pages/dashboard/manageBooks/manageBooks.jsx";
import AddBook from "../pages/dashboard/addBook/AddBook.jsx";
import UpdateBook from "../pages/dashboard/editBook/UpdateBook.jsx";
import AddSpeciality from "../pages/dashboard/addSpecialities/AddSpeciality.jsx";
import AddBranch from "../pages/dashboard/addBranch/addBranch.jsx";
import AddStudent from "../pages/dashboard/addStudent/AddStudent.jsx";
import AddAuthor from "../pages/dashboard/addAuthor/AddAuthor.jsx";
import AddCategory from "../pages/dashboard/addCategory/AddCategory.jsx";
import AddPubHouse from "../pages/dashboard/addPubHouse/AddPubHouse.jsx";

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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "add-new-book",
        element: <AddBook />,
      },
      {
        path: "edit-book/:id",
        element: <UpdateBook />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      {
        path: "Specialities",
        element: <AddSpeciality />,
      },
      {
        path: "Branches",
        element: <AddBranch />,
      },
      {
        path: "Students",
        element: <AddStudent />,
      },
      {
        path: "Authors",
        element: <AddAuthor />,
      },
      {
        path: "Categories",
        element: <AddCategory />,
      },
      {
        path: "pubHouses",
        element: <AddPubHouse />,
      },
    ],
  },
]);

export default router;
