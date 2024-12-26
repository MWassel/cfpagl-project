import React, { useState, useEffect } from "react";
import InputField from "../addBook/InputField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useAddAuthorMutation } from "../../../redux/features/addAuthor/authorApi";
function AddAuthor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addAuthor, { isLoading, isError }] = useAddAuthorMutation();

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
        await addAuthor(data).unwrap();
        Swal.fire({
          title: "نجاح",
          text: "تم اضافة الكاتب بنجاح",
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
          text: "حدث خطأ أثناء إضافة الكاتب",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "إلغاء",
        text: "لم يتم إضافة الكاتب",
        icon: "info",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">إضافة كاتب جديد</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="اسم الكاتب"
          name="author_name"
          placeholder="أدخل اسم الكاتب"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="جنسيته"
          name="nationality"
          placeholder="ادخل جنسيته (خياري)"
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

export default AddAuthor;
