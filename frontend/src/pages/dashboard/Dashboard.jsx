import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useNavigate, Link } from "react-router-dom";
import { MdOutlineManageHistory, MdIncompleteCircle } from "react-icons/md";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBookCopies, setTotalBookCopies] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [totalUnreturnedLoans, setTotalUnreturnedLoans] = useState(0);
  const [totalPenalties, setTotalPenalties] = useState(0);
  const navigate = useNavigate();

  const fetchTotalBooks = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl()}/api/stats/total-books`, {
        withCredentials: true,
      })
      .then((res) => {
        setTotalBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchTotalBookCopies = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl()}/api/stats/total-copies`, {
        withCredentials: true,
      })
      .then((res) => {
        setTotalBookCopies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchTotalStudents = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl()}/api/stats/total-students`, {
        withCredentials: true,
      })
      .then((res) => {
        setTotalStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchTotalLoans = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl()}/api/stats/total-loans`, {
        withCredentials: true,
      })
      .then((res) => {
        setTotalLoans(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchTotalUnreturnedLoans = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl()}/api/stats/total-unreturned-loans`, {
        withCredentials: true,
      })
      .then((res) => {
        setTotalUnreturnedLoans(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchTotalPenalties = async () => {
    setLoading(true);
    axios
      .get(`${baseUrl()}/api/stats/total-penalties-applied`, {
        withCredentials: true,
      })
      .then((res) => {
        setTotalPenalties(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTotalBooks();
    fetchTotalBookCopies();
    fetchTotalStudents();
    fetchTotalLoans();
    fetchTotalUnreturnedLoans();
    fetchTotalPenalties();
  }, [
    totalBooks,
    totalBookCopies,
    totalStudents,
    totalLoans,
    totalUnreturnedLoans,
  ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{totalBooks}</span>
            <span className="block text-gray-500">عدد الكتب</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <rect
                x="6"
                y="9"
                width="12"
                height="8"
                rx="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <rect
                x="8"
                y="4"
                width="8"
                height="5"
                rx="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M8 14h8v4H8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{totalBookCopies}</span>
            <span className="block text-gray-500">عدد النسخ</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">
              {totalStudents}
            </span>
            <span className="block text-gray-500">عدد المنخرطين</span>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className="size-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">{totalLoans}</span>
            <span className="block text-gray-500">عدد الإعارات</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                d="M12 3v12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
              />
              <circle cx="12" cy="19" r="1" fill="currentColor" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{totalPenalties}</span>
            <span className="block text-gray-500">العقوبات الملقات</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {totalUnreturnedLoans}
            </span>
            <span className="block text-gray-500">الإعارات الغير مستردة</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
