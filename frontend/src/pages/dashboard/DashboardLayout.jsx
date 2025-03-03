import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import {
  HiAcademicCap,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineMailOpen,
  HiOutlineCalendar,
  HiOutlineCreditCard,
} from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudent } from "react-icons/pi";
import { FaPencilAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { HiLibrary } from "react-icons/hi";
import { AiOutlineStop } from "react-icons/ai";
import { LuPrinter } from "react-icons/lu";
import { FaBookReader } from "react-icons/fa";

import favIcon from "../../assets/fav-icon.png";
import Avatar from "../../assets/avatar.png";

import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

function DashboardLayout() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    // Handle clicks outside of dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Debounce search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim()) {
      setIsLoading(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await axios.get(
            `${baseUrl()}/api/books/search?query=${encodeURIComponent(
              searchQuery.trim()
            )}`
          );
          setSearchResults(response.data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300); // 300ms delay
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleBookClick = (bookId) => {
    setShowDropdown(false);
    setSearchQuery("");
    navigate(`/books/${bookId}`);
  };

  const handleLogout = () => {
    axios
      .get(`${baseUrl()}/api/auth/logout-manager`, { withCredentials: true })
      .then(() => {
        alert("تم تسجيل الخروج بنجاح");
        localStorage.removeItem("user");
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
      <aside className="hidden sm:flex sm:flex-col">
        <a
          href="/"
          className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
        >
          <img src={favIcon} alt="" />
        </a>
        <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-lg"
            >
              <span className="sr-only">Dashboard</span>
              <HiOutlineChartBar className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/Specialities"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Specialities</span>
              <HiAcademicCap className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/Branches"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Branch</span>
              <SiGoogleclassroom className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/Students"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Students</span>
              <PiStudent className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/Authors"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Authors</span>
              <FaPencilAlt className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/Categories"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">Categories</span>
              <BiSolidCategory className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/pubHouses"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">pubHouses</span>
              <HiLibrary className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/Punishments"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">punishment</span>
              <AiOutlineStop className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/BookCopys"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">BookCopys</span>
              <LuPrinter className="h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/BookAuthors"
              className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
            >
              <span className="sr-only">BookAuthors</span>
              <FaBookReader className="h-6 w-6" />
            </Link>
          </nav>
        </div>
      </aside>
      <div className="flex-grow text-gray-800">
        <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
          <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
            <span className="sr-only">Menu</span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div className="relative w-full max-w-md sm:-ml-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <div
              className="relative flex-1 flex justify-center"
              ref={dropdownRef}
            >
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                role="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث..."
                className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
              />
              {showDropdown && (
                <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      Loading...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((book) => (
                        <div
                          key={book.book_id}
                          onClick={() => handleBookClick(book.book_id)}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <img
                            src={`${baseUrl()}${book.cover}`}
                            alt={book.book_title}
                            className="w-12 h-16 object-cover rounded mr-4"
                          />
                          <span className="text-sm">{book.book_title}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No books found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center ml-auto">
            <div className="inline-flex items-center p-2rounded-lg">
              <span className="sr-only">User Menu</span>
              <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                <span className="font-semibold">
                  {user ? `${user.username}` : "User"}
                </span>
                <span className="text-xs text-gray-400">
                  {user ? ` ID: ${user.id}` : "id"}
                </span>
              </div>
              <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src={Avatar}
                  alt="user profile photo"
                  className="h-full w-full object-cover"
                />
              </span>
            </div>
            <div className="border-l pl-3 ml-3 space-x-1">
              <button
                onClick={handleLogout}
                className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
              >
                <span className="sr-only">Log out</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className="p-6 sm:p-10 space-y-6 ">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">لوحة التحكم</h1>
            </div>
            <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
              <Link
                to="/dashboard/manage-books"
                className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                إدارة الكتب
              </Link>

              <Link
                to="/dashboard/Penaltys"
                className="inline-flex px-5 py-3 text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 rounded-md ml-6 mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                معاقبة
              </Link>

              <Link
                to="/dashboard/add-new-book"
                className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                إضافة كتاب
              </Link>
              <Link
                to="/dashboard/Land-book"
                className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                إعارة كتاب
              </Link>
              <Link
                to="/dashboard/Return-book"
                className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                إستعادة كتاب
              </Link>
              <Link
                to="/dashboard/Reading-session"
                className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                جلسة قراءة
              </Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </section>
  );
}

export default DashboardLayout;
