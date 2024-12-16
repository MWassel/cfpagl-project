import React, { useState, useEffect } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { useNavigate, Link } from "react-router-dom";

import { useAddSpecialityMutation } from "../../../redux/features/specialities/specialitiesApi";

function AddSpeciality() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addSpeciality, { isLoading, isError }] = useAddSpecialityMutation();

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
        await addSpeciality(data).unwrap();
        Swal.fire({
          title: "نجاح",
          text: "تم اضافة التخصص بنجاح",
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
          text: "حدث خطأ أثناء إضافة التخصص",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "إلغاء",
        text: "لم يتم إضافة التخصص",
        icon: "info",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">إضافة تخصص جديد</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="رمز التخصص"
          name="speciality_id"
          placeholder="أدخل رمز التخصص"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="اسم التخصص"
          name="speciality"
          placeholder="أدخل اسم التخصص"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="مدة التكوين "
          name="training_duration"
          placeholder="ادخل مدة التكوين (أشهر)"
          type="number"
          register={register}
        />

        <SelectField
          label="نوع التكوين "
          name="training_type"
          options={[
            { value: "حضوري", label: "حضوري" },
            { value: "عن بعد", label: "عن بعد" },
            { value: "عن طريق التمهين", label: "عن طريق التمهين" },
          ]}
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

export default AddSpeciality;
