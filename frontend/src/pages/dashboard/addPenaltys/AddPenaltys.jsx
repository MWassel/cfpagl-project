import React, { useState, useEffect } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { useAddPenaltyMutation } from "../../../redux/features/penaltys/penaltys";

function AddPenaltys() {
  const [punishments, setPunishments] = useState([]);
  const [penaltyRecords, setPenaltyRecords] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addPenalty, { isLoading }] = useAddPenaltyMutation();

  // Fetch punishments for the select field
  const fetchPunishments = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/punishment`, {
        withCredentials: true,
      });
      setPunishments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch penalty records for the table
  const fetchPenaltyRecords = async () => {
    try {
      const response = await axios.get(`${baseUrl()}/api/penalty_record`, {
        withCredentials: true,
      });

      // Filter out expired penalties
      const currentDate = new Date();
      const activeRecords = response.data.filter((record) => {
        const endDate = new Date(record.penalty_start_date);
        endDate.setDate(endDate.getDate() + record.punishment.duration);
        return endDate >= currentDate;
      });

      setPenaltyRecords(activeRecords);
    } catch (error) {
      console.error("Error fetching penalty records:", error);
    }
  };

  useEffect(() => {
    fetchPunishments();
    fetchPenaltyRecords();
    // Refresh data every minute
    const interval = setInterval(fetchPenaltyRecords, 60000);
    return () => clearInterval(interval);
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
        await addPenalty(data).unwrap();
        await Swal.fire({
          title: "نجاح",
          text: "تم اضافة العقوبة بنجاح",
          icon: "success",
          confirmButtonText: "تم",
        });
        reset();
        fetchPenaltyRecords(); // Refresh the table
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "فشل",
          text: "حدث خطأ أثناء إضافة العقوبة",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Form Section */}
      <div className="md:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-6">
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
              className="w-full py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors"
            >
              {isLoading ? "يتم الإضافة.." : "اضافة"}
            </button>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="md:w-2/3">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h3 className="font-semibold text-lg text-gray-800">
              العقوبات النشطة
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    رمز الإعارة
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    تاريخ البدء
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    سبب العقوبة
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    المدة (أيام)
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    تاريخ الانتهاء
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {penaltyRecords.map((record, index) => {
                  const endDate = new Date(record.penalty_start_date);
                  endDate.setDate(
                    endDate.getDate() + record.punishment.duration
                  );

                  return (
                    <tr key={record.penalty_id}>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {record.loan_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {new Date(
                          record.penalty_start_date
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {record.punishment.cause}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {record.punishment.duration}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {endDate.toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPenaltys;
