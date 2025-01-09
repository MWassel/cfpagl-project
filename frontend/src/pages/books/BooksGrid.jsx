import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

const BooksGrid = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/books`);
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books");
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter(
          (book) => book.categorie_id === parseInt(selectedCategory)
        );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Section */}
      <div className="mb-8">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <option key={category.categorie_id} value={category.categorie_id}>
                {category.categorie_name}
              </option>
            ))}
        </select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredBooks.map((book) => (
          <Link
            to={`/books/${book.book_id}`}
            key={book.book_id}
            className="group"
          >
            <div className="flex flex-col items-center transition-transform duration-300 group-hover:scale-105">
              {/* Book Cover */}
              <div className="w-full aspect-[2/3] relative mb-3">
                <img
                  src={`${baseUrl()}${book.cover}`}
                  alt={book.book_title}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  loading="lazy"
                />
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 rounded-lg" />
              </div>

              {/* Book Title */}
              <h3 className="text-center text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-gray-600">
                {book.book_title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No books found in this category
        </div>
      )}
    </div>
  );
};

export default BooksGrid;
