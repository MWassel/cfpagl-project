import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

const AddBook = () => {
  const [categories, setCategories] = useState([]);
  const [pubHouses, setPubHouses] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/categories`, {
        withCredentials: true,
      });
      setCategories(
        response.data.map((category) => ({
          value: category.categorie_id,
          label: category.categorie_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchPubHouses = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/publishing`, {
        withCredentials: true,
      });
      setPubHouses(
        response.data.map((publisher) => ({
          value: publisher.publishing_house_id,
          label: publisher.publishing_house_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching publishers:", error.message);
    }
  };

  useEffect(() => {
    fetchPubHouses();
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    // Create FormData to send file and other data
    const formData = new FormData();

    // Append all text fields
    formData.append("book_id", data.bookId);
    formData.append("book_title", data.bookTitle);
    formData.append("summary", data.summary);
    formData.append("total_pages", data.totalPages);
    formData.append("publishing_year", data.PubYear);
    formData.append("categorie_id", data.Category);
    formData.append("publishing_house_id", data.pubHouseId);

    // Append the file
    if (imageFile) {
      formData.append("cover", imageFile);
    }

    try {
      await addBook(formData).unwrap();
      Swal.fire({
        title: "نجاح",
        text: "تم اضافة الكتاب بنجاح",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "تم",
        cancelButtonText: "اغلاق",
      });
      reset();
      setImageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to add book. Please try again.",
        icon: "error",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">إضافة كتاب جديد</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="رمز الكتاب"
          name="bookId"
          placeholder="أدخل رمز الكتاب"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="عنوان الكتاب"
          name="bookTitle"
          placeholder="ادخل عنوان الكتاب"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="وصف الكتاب"
          name="summary"
          placeholder="ادخل وصف الكتاب"
          type="textarea"
          register={register}
        />

        <InputField
          label="عدد صفحات الكتاب"
          name="totalPages"
          placeholder="ادخل عدد صفحات الكتاب"
          type="number"
          register={register}
          rules={{ required: true }}
        />

        <SelectField
          label="تصنيف الكتاب"
          name="Category"
          options={categories}
          register={register}
          rules={{ required: true }}
        />

        <SelectField
          label="دار النشر"
          name="pubHouseId"
          options={pubHouses}
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="سنة النشر"
          name="PubYear"
          type="number"
          placeholder="ادخل سنة النشر"
          register={register}
          rules={{ required: true }}
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            صورة الغلاف
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? "يتم الإضافة.." : "اضافة"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
