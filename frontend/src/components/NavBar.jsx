import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { useAuth } from "../context/authContext.jsx";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

export const NavBar = () => {
  const { isAuthenticated } = useAuth();
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

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center relative">
        {/* Menu icon */}
        <Link to="/">
          <HiMiniBars3CenterLeft className="w-6 h-6" />
        </Link>

        {/* Search bar with dropdown */}
        <div className="relative flex-1 flex justify-center" ref={dropdownRef}>
          <div className="relative w-full max-w-lg ml-36">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="إبحث عن كتاب"
              className="bg-[#EAEAEA] w-full py-2 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-center"
            />

            {/* Search Results Dropdown */}
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

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <Link
            to="/login"
            className={
              isAuthenticated
                ? "bg-white hover:bg-gray-50 px-4 py-2 rounded-md flex items-center gap-3 border-2 border-gray-200 hover:border-primary transition-all duration-200"
                : "bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm gap-2"
            }
          >
            <FaUser className="" />
            <span className="">
              {isAuthenticated ? "لوحة التحكم" : "تسجيل دخول"}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
