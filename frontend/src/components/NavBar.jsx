import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";

export const NavBar = () => {
  return (
    <header className=" max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className=" w-6 h-6" />
          </Link>

          {/* Search bar */}
          <div className=" relative sm:w-72 w-40 space-x-1">
            <IoSearchOutline className=" absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="إبحث عن كتاب"
              className=" bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Right side */}
        <div className=" relative flex items-center md:space-x-3 space-x-2 ">
          <Link
            to="/login"
            className=" bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm gap-2"
          >
            <FaUser className="" />
            <span className="">تسجيل الدخول</span>
            
          </Link>
        </div>
      </nav>
    </header>
  );
};
