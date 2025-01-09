import { Link } from "react-router-dom";
import baseUrl from "../../utils/baseUrl";

// BookCard.jsx
export const BookCard = ({ book }) => {
  const bookSummary = book?.summary || "";

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/books/${book?.book_id}`}>
            <img
              src={`${baseUrl()}${book?.cover}`}
              alt={book?.book_title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book?.book_id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.book_title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {bookSummary.length > 80
              ? `${bookSummary.slice(0, 80)}...`
              : bookSummary}
          </p>
          <Link to={`/books/${book?.book_id}`}>
            <button className="btn-primary px-6 space-x-1 flex items-center gap-1">
              <span>تفاصيل</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BookCard;
