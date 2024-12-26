import React, { useState, useEffect } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { useNavigate, Link } from "react-router-dom";
import { useAddBookCopyMutation } from "../../../redux/features/bookCopy/bookCopyApi";

function AddBookCopy() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addBookCopy, { isLoading, isError }] = useAddBookCopyMutation();

  const onSubmit = async (data) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "يرجى التأكد من صحة البيانات المدخلة",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، أضف",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      try {
        await addBookCopy(data).unwrap();
        Swal.fire({
          title: "نجاح",
          text: "تم اضافة نسخة كتاب  بنجاح",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "تم",
          cancelButtonText: "اغلاق",
        });
        reset();
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "فشل",
          text: "حدث خطأ أثناء إضافة نسخة كتاب",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "إلغاء",
        text: "لم يتم إضافة نسخة كتاب",
        icon: "info",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        إضافة نسخة كتاب جديد
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="رمز النسخة"
          name="copy_id"
          placeholder="أدخل رمز النسخة"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="رقم الجرد"
          name="inventory_number"
          placeholder="ادخل رقم الجرد"
          type="number"
          register={register}
          rules={{ required: true }}
        />

        <SelectField
          label="رمز الكتاب"
          name="book_id"
          options={
            books.map((book) => ({
              value: book.book_id,
              label: `${book.book_title} - ${book.book_id}`,
            })) || []
          }
          register={register}
          rules={{ required: true }}
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? "يتم الإضافة.." : "اضافة"}
        </button>
      </form>
    </div>
  );
}

export default AddBookCopy;
