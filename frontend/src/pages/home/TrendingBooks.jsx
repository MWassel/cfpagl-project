import { useEffect, useState } from "react";
import { BookCard } from "../books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

export const TrendingBooks = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter(
          (book) => book.categorie_id === parseInt(selectedCategory)
        );

  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold mb-6">الأكثر شهرة</h2>
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          name="category"
          id="category"
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

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
          1180: { slidesPerView: 3, spaceBetween: 50 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredBooks?.length > 0 &&
          filteredBooks.map((book) => (
            <SwiperSlide key={book.book_id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TrendingBooks;
