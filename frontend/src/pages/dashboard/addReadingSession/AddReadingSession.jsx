import React, { useState, useEffect } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { useAuth } from "../../../context/authContext";
import {
  useGetReadingSessionQuery,
  useUpdateReadingSessionMutation,
  useCreateReadingSessionMutation,
} from "../../../redux/features/readingSession/readingSessionApi";

function AddReadingSession() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Queries and Mutations
  const {
    data: sessions,
    isLoading: isLoadingSessions,
    isError: isErrorSessions,
    error: errorSessions,
    refetch,
  } = useGetReadingSessionQuery();
  const [updateSession] = useUpdateReadingSessionMutation();
  const [createReadingSession, { isLoading: isCreating }] =
    useCreateReadingSessionMutation();

  // Fetch students
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

  // Handle ending a session
  const handleEndSession = async (id) => {
    try {
      await updateSession({ id }).unwrap();
      await Swal.fire({
        title: "نجاح",
        text: "تم إنهاء جلسة القراءة بنجاح",
        icon: "success",
        confirmButtonText: "تم",
      });
      refetch();
    } catch (error) {
      console.error("Failed to end reading session:", error.message);
      Swal.fire({
        title: "خطأ",
        text: "فشل في إنهاء جلسة القراءة",
        icon: "error",
      });
    }
  };

  // Handle creating a new session
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
        await createReadingSession(data).unwrap();
        await Swal.fire({
          title: "نجاح",
          text: "تم اضافة جلسة قراءة بنجاح",
          icon: "success",
          confirmButtonText: "تم",
        });
        reset();
        refetch();
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "فشل",
          text: "حدث خطأ أثناء إضافة جلسة قراءة",
          icon: "error",
        });
      }
    }
  };

  if (isLoadingSessions) return <div>Loading...</div>;
  if (isErrorSessions) return <div>Error: {errorSessions.message}</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Form Section */}
      <div className="md:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            إضافة جلسة قراءة جديد
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="ملاحظة"
              name="note"
              placeholder="ادخل ملاحظة"
              type="text"
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

            <SelectField
              label="رمزك"
              name="manager_id"
              options={[
                { value: user.id, label: `${user.username} (${user.id})` },
              ]}
              register={register}
            />

            <InputField
              label="رمز نسخة الكتاب"
              name="copy_id"
              placeholder="أدخل رمز نسخة الكتاب"
              register={register}
            />

            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors"
            >
              {isCreating ? "يتم الإضافة.." : "اضافة"}
            </button>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="md:w-2/3">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h3 className="font-semibold text-lg text-gray-800">
              جلسات القراءة النشطة
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
                    تاريخ الدخول
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    رمز المتربص
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    رمز المشرف
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    رمز النسخة
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sessions?.map((session, index) => (
                  <tr key={session.read_session}>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {new Date(session.entry_time).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {session.student_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {session.manager_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {session.copy_id}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleEndSession(session.read_session)}
                        className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        إنهاء الجلسة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReadingSession;
