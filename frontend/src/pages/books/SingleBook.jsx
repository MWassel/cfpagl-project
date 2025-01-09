import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useFetchSingleBookQuery } from "../../redux/features/books/booksApi";

const SingleBook = () => {
  const { book_id } = useParams();
  const [bookIndex, setBookIndex] = useState(null);
  const [indexLoading, setIndexLoading] = useState(true);
  const [indexError, setIndexError] = useState(null);

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useFetchSingleBookQuery(book_id);

  useEffect(() => {
    const fetchBookIndex = async () => {
      try {
        const response = await axios.get(
          `${baseUrl()}/api/book_index/get-index/${book_id}`
        );
        setBookIndex(response.data);
      } catch (err) {
        setIndexError(err.message);
      } finally {
        setIndexLoading(false);
      }
    };

    if (book_id) {
      fetchBookIndex();
    }
  }, [book_id]);

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>Error loading book info: {error?.data?.error || error?.error}</div>
    );
  if (!book) return <div>No book found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Book Information - Left Side */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              {book.book_title}
            </h1>

            <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  Summary
                </h2>
                <p className="text-gray-600">
                  {book.summary || "No summary available"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Category</h3>
                  <p className="text-gray-600">
                    {book.Categories?.categorie_name}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">
                    Publishing House
                  </h3>
                  <p className="text-gray-600">
                    {book.publishing_house?.publishing_house_name}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">
                    Publishing Year
                  </h3>
                  <p className="text-gray-600">{book.publishing_year}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Total Pages</h3>
                  <p className="text-gray-600">{book.total_pages}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Book ID</h3>
                  <p className="text-gray-600">{book.book_id}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Added Date</h3>
                  <p className="text-gray-600">
                    {new Date(book.stored_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Images - Right Side */}
          <div className="md:w-1/3 bg-gray-50 p-8">
            <div className="space-y-6">
              {/* Book Cover */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Book Cover
                </h3>
                <img
                  src={`${baseUrl()}${book.cover}`}
                  alt={book.book_title}
                  className="w-full rounded-lg shadow-md"
                />
              </div>

              {/* Book Index */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Book Index
                </h3>
                {indexLoading ? (
                  <div>Loading index...</div>
                ) : indexError ? (
                  <div className="text-red-500">Error loading index</div>
                ) : bookIndex && bookIndex.index_picture ? (
                  <img
                    src={`${baseUrl()}${bookIndex.index_picture}`}
                    alt="Book Index"
                    className="w-full rounded-lg shadow-md"
                  />
                ) : (
                  <div className="text-gray-500 p-4 bg-gray-100 rounded-lg text-center">
                    No index found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
