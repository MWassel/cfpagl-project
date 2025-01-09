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
import AddPunishment from "../pages/dashboard/addPunishment/AddPunishment.jsx";
import AddBookCopy from "../pages/dashboard/addBookCopy/AddBookCopy.jsx";
import AddBookAuthors from "../pages/dashboard/addBookAuthors/AddBookAuthors.jsx";
import AddLoan from "../pages/dashboard/addLoan/AddLoan.jsx";
import ReturnBook from "../pages/dashboard/returnBooks/ReturnBook.jsx";
import AddPenaltys from "../pages/dashboard/addPenaltys/AddPenaltys.jsx";
import AddReadingSession from "../pages/dashboard/addReadingSession/AddReadingSession.jsx";
import BooksGrid from "../pages/books/BooksGrid.jsx";

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
        path: "/books",
        element: <BooksGrid />,
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
      {
        path: "Punishments",
        element: <AddPunishment />,
      },
      {
        path: "BookCopys",
        element: <AddBookCopy />,
      },
      {
        path: "BookAuthors",
        element: <AddBookAuthors />,
      },
      {
        path: "Land-book",
        element: <AddLoan />,
      },
      {
        path: "Return-book",
        element: <ReturnBook />,
      },
      {
        path: "Penaltys",
        element: <AddPenaltys />,
      },
      {
        path: "Reading-session",
        element: <AddReadingSession />,
      },
    ],
  },
]);

export default router;
