import React, { useState, useEffect } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { useNavigate, Link } from "react-router-dom";
import { useAddBranchMutation } from "../../../redux/features/branch/branchApi";
function AddSpeciality() {
  const [specialities, setSpecialities] = useState([]);
  const fetchSpecialities = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/specialities`, {
        withCredentials: true,
      });
      console.log(response);
      setSpecialities(response.data);
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };
  useEffect(() => {
    fetchSpecialities();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addBranch, { isLoading, isError }] = useAddBranchMutation();

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      training_start_date: new Date(data.training_start_date).toISOString(),
      training_end_date: new Date(data.training_end_date).toISOString(),
    };
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
        await addBranch(formattedData).unwrap();
        Swal.fire({
          title: "نجاح",
          text: "تم اضافة الجذع بنجاح",
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">إضافة جذع جديد</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="رمز الجذع"
          name="branch_id"
          placeholder="أدخل رمز الجذع"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="تاريخ بدء التكوين"
          name="training_start_date"
          placeholder="ادخل تاريخ بدء التكوين"
          type="date"
          register={register}
          rules={{ required: true }}
        />

        <InputField
          label="تاريخ انتهاء التكوين"
          name="training_end_date"
          placeholder="ادخل تاريخ انتهاء التكوين"
          type="date"
          register={register}
        />

        <SelectField
          label="التخصص"
          name="speciality_id"
          options={specialities.map((speciality) => ({
            value: speciality.speciality_id,
            label: speciality.speciality,
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

export default AddSpeciality;
