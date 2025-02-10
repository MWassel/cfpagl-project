import React, { useState, useEffect } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useAddLoanMutation } from "../../../redux/features/loan/loanApi";
import baseUrl from "../../../utils/baseUrl";

function AddLoan() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/student`, {
        withCredentials: true,
      });
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addLoan, { isLoading, isError }] = useAddLoanMutation();

  const onSubmit = async (data) => {
    // Add manager_id to the form data directly
    const formDataWithManager = {
      ...data,
      manager_id: user.id,
    };

    console.log(formDataWithManager);
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
        await addLoan(formDataWithManager).unwrap();
        Swal.fire({
          title: "نجاح",
          text: "تم الإعارة بنجاح",
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
          text: "حدث خطأ أثناء الإعارة",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "إلغاء",
        text: "لم يتم الإعارة",
        icon: "info",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">إعارة كتاب</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="رمز نسخة الكتاب"
          name="copy_id"
          placeholder="أدخل رمز نسخة الكتاب "
          register={register}
        />

        <SelectField
          label="رمز المتربص"
          name="student_id"
          options={students.map((student) => ({
            value: student.student_id,
            label:
              student.student_id +
              " - " +
              student.first_name +
              " " +
              student.last_name,
          }))}
          register={register}
        />

        <InputField
          label="ملاحظة"
          name="note"
          placeholder="أدخل ملاحظة (خياري)"
          register={register}
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

export default AddLoan;
