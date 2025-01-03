import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { useAuth } from "../context/authContext.jsx";

export const NavBar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center relative">
        {/* Menu icon */}

        <Link to="/" className="absolute left-0">
          <HiMiniBars3CenterLeft className="w-6 h-6" />
        </Link>

        {/* Centered, shorter search bar */}
        <div className="relative flex-1 flex justify-center">
          <div className="relative w-full max-w-lg ml-36">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="إبحث عن كتاب"
              className="bg-[#EAEAEA] w-full py-2 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-center"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <Link
            to="/login"
            className={
              isAuthenticated
                ? "bg-white hover:bg-gray-50 px-4 py-2 rounded-md flex items-center gap-3 border-2 border-gray-200 hover:border-primary transition-all duration-200"
                : "bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm gap-2"
            }
          >
            <FaUser className="" />
            <span className="">
              {isAuthenticated ? "لوحة التحكم" : "تسجيل دخول"}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
