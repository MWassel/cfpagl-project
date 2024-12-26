import React, { useState, useEffect } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { useNavigate, Link } from "react-router-dom";

import { useAddStudentMutation } from "../../../redux/features/student/studentApi";

function AddStudent() {
  const [branches, setBranches] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addStudent, { isLoading, isError }] = useAddStudentMutation();

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/branch`, {
        withCredentials: true,
      });
      console.log(response);
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);

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
        await addStudent(data).unwrap();
        Swal.fire({
          title: "نجاح",
          text: "تم اضافة المتربص بنجاح",
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
          text: "حدث خطأ أثناء إضافة المتربص",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "إلغاء",
        text: "لم يتم إضافة المتربص",
        icon: "info",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        إضافة متربص جديد
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="رمز المتربص"
          name="student_id"
          placeholder="أدخل رمز المتربص"
          type="number"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="اسم المتربص"
          name="first_name"
          placeholder="أدخل اسم المتربص"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="لقب المتربص"
          name="last_name"
          placeholder="أدخل لقب المتربص"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="تاريخ الميلاد"
          name="birth_date"
          placeholder="أدخل تاريخ الميلاد المتربص"
          type="date"
          register={register}
        />

        <InputField
          label="رقم الجوال"
          name="phone_number"
          placeholder="أدخل رقم جوال المتربص (خياري)"
          register={register}
        />

        <SelectField
          label="الجنس"
          name="sex"
          options={[
            { value: "ذكر", label: "ذكر" },
            { value: "انثى", label: "انثى" },
            ,
          ]}
          type="text"
          register={register}
          rules={{ required: true }}
        />

        <SelectField
          label="الفرع"
          name="branch_id"
          options={branches.map((branch) => ({
            value: branch.branch_id,
            label: branch.branch_id,
          }))}
          type="text"
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

export default AddStudent;
