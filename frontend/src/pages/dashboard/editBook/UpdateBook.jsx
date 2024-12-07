import React, { useEffect, useState } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useFetchSingleBookQuery,
  useUpdateBookMutation,
} from "../../../redux/features/books/booksApi";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

function UpdateBook() {
  const { id } = useParams();
  const { data: bookData, isLoading, isError } = useFetchSingleBookQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
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
    if (bookData) {
      setValue("bookId", bookData.book_id);
      setValue("bookTitle", bookData.title);
      setValue("summary", bookData.summary);
      setValue("totalPages", bookData.total_pages);
      setValue("PubYear", bookData.publishing_year);
      setValue("Category", bookData.category);
      setValue("pubHouseId", bookData.pubHouseId);
    }
    fetchCategories();
    fetchPubHouses();
  }, [bookData, setValue]);
  const onSubmit = async (data) => {
    const updateBookData = {
      book_id: data.bookId,
      book_title: data.bookTitle,
      summary: data.summary,
      total_pages: Number(data.totalPages),
      publishing_year: Number(data.PubYear),
      categorie_id: data.Category,
      publishing_house_id: data.pubHouseId,
      cover: data.cover,
    };
    try {
      await updateBook({ id, updatedBook: updateBookData }).unwrap();
      Swal.fire({
        title: "نجاح",
        text: "تم تعديل الكتاب بنجاح",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "تم",
        cancelButtonText: "اغلاق",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error updating book:", error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

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

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          تحديث
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
