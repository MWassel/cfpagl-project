import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import { useAddIndexMutation } from "../../../redux/features/index/indexApi";
import { useAddBookCopyMutation } from "../../../redux/features/bookCopy/bookCopyApi";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

const AddBook = () => {
  const [categories, setCategories] = useState([]);
  const [pubHouses, setPubHouses] = useState([]);
  const [bookId, setBookId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [indexImageFile, setIndexImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const watchedBookId = watch("bookId", "");

  useEffect(() => {
    setBookId(watchedBookId);
  }, [watchedBookId]);

  const [addBook, { isLoading: isBookLoading }] = useAddBookMutation();
  const [addIndex, { isLoading: isIndexLoading }] = useAddIndexMutation();
  const [addBookCopy, { isLoading: isCopyLoading }] = useAddBookCopyMutation();

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

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "cover") {
        setImageFile(file);
      } else if (type === "index") {
        setIndexImageFile(file);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      // First, add the book
      const bookFormData = new FormData();
      bookFormData.append("book_id", data.bookId);
      bookFormData.append("book_title", data.bookTitle);
      bookFormData.append("summary", data.summary);
      bookFormData.append("total_pages", data.totalPages);
      bookFormData.append("publishing_year", data.PubYear);
      bookFormData.append("categorie_id", data.Category);
      bookFormData.append("publishing_house_id", data.pubHouseId);

      if (imageFile) {
        bookFormData.append("cover", imageFile);
      }

      await addBook(bookFormData).unwrap();

      // Then, add the index
      const indexFormData = new FormData();
      indexFormData.append("index_id", data.indexId);
      indexFormData.append("book_id", data.bookId);

      if (indexImageFile) {
        indexFormData.append("index", indexImageFile);
      }

      await addIndex(indexFormData).unwrap();

      // Finally, add the book copy
      const copyData = {
        copy_id: `${data.bookId}-1`, // First copy of the book
        inventory_number: data.inventoryNumber,
        location: data.location,
        book_id: data.bookId,
      };

      await addBookCopy(copyData).unwrap();

      Swal.fire({
        title: "نجاح",
        text: "تم اضافة الكتاب والفهرس ونسخة الكتاب بنجاح",
        icon: "success",
        confirmButtonText: "تم",
      });

      reset();
      setImageFile(null);
      setIndexImageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "خطأ",
        text: "فشل في اضافة الكتاب او الفهرس او نسخة الكتاب",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">إضافة كتاب جديد</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="رمز الكتاب"
            name="bookId"
            placeholder="أدخل رمز الكتاب"
            register={register}
            rules={{ required: true }}
          />

          <InputField
            label="رمز الفهرس"
            name="indexId"
            placeholder={`${bookId ? bookId : "ادخل رمز الفهرس"}`}
            register={register}
            rules={{ required: true }}
          />
        </div>

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

        {/* New fields for book copy */}
        <InputField
          label="رقم الجرد"
          name="inventoryNumber"
          placeholder="ادخل رقم الجرد"
          type="number"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="الموقع في المكتبة"
          name="location"
          placeholder="ادخل الموقع في المكتبة"
          register={register}
          rules={{ required: true }}
        />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              صورة الغلاف
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "cover")}
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              صورة الفهرس
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "index")}
              className="w-full"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors"
          disabled={isBookLoading || isIndexLoading || isCopyLoading}
        >
          {isBookLoading || isIndexLoading || isCopyLoading
            ? "جاري الإضافة..."
            : "اضافة"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
