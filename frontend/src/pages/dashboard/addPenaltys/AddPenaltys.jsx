import React, { useState, useEffect } from "react";
import InputField from "../addBook/InputField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { useNavigate, Link } from "react-router-dom";
import { useAddPenaltyMutation } from "../../../redux/features/penaltys/penaltys";
import SelectField from "../addBook/SelectField";
function AddPenaltys() {
  const [punishments, setPunishments] = useState([]);

  const fetchPunishments = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/punishment`, {
        withCredentials: true,
      });
      console.log(response.data);
      setPunishments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPunishments();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addPenalty, { isLoading, isError }] = useAddPenaltyMutation();

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
        await addPenalty(data).unwrap();
        Swal.fire({
          title: "نجاح",
          text: "تم اضافة العقوبة بنجاح",
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
          text: "حدث خطأ أثناء إضافة العقوبة",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "إلغاء",
        text: "لم يتم إضافة العقوبة",
        icon: "info",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">إلقاء عقوبة</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="رمز الإعارة"
          name="loan_id"
          type="number"
          register={register}
          required
        />

        <SelectField
          label="العقوبة"
          name="punishment_id"
          options={punishments.map((punishment) => ({
            value: punishment.punishment_id,
            label: punishment.cause + " - " + punishment.duration + " يوم",
          }))}
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

export default AddPenaltys;
