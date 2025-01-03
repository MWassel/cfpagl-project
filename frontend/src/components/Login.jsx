import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoginManagerMutation } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx"; // Assuming this is where your context is

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [login, { isLoading }] = useLoginManagerMutation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Assuming you have a method to set the context

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true }); // Navigate once authentication is true
    }
  }, [isAuthenticated, navigate]); // This hook will run when isAuthenticated changes

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();

      // Check if login was successful
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setIsAuthenticated(true); // Update context to trigger the navigation effect
        console.log("Navigating to dashboard...");
      } else {
        // Handle unsuccessful login
        setMessage(response.error || "Login failed. Please try again.");
      }
    } catch (error) {
      // Handle network or unexpected errors
      setMessage(
        error?.data?.error || error?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="h-[calc(100vh - 120px)] flex justify-center items-center  mt-24 ">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pb-6 mb-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          الرجاء تسجيل الدخول
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2 text-right"
            >
              اسم المستخدم
            </label>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${
                errors.username ? "border-red-500" : ""
              }`}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2 text-right"
            >
              كلمة المرور
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow ${
                errors.password ? "border-red-500" : ""
              }`}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          {message && (
            <div className="mb-4">
              <p className="text-red-500 text-xs italic">{message}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-gray-500 text-xs">
          &copy;2025 CFPA Guemar Library. All rights reserved.
        </p>
      </div>
    </div>
  );
};
