import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaInstagram, FaTwitter, FaCode } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Nav */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <a href="#home" className="hover:text-primary">
                الصفحة الرئيسية
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                خدمات
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary">
                معلومات عنا
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                اتصل بنا
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            اشترك في النشرة الإخبارية لدينا لتلقي أحدث التحديثات والأخبار
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="w-full px-4 py-2 rounded-l-md text-black"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark">
              اشترك
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto mt-10 border-t border-gray-700 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {/* Left Side - Privacy Links */}
          {/* Developer Credit */}
          <a
            href="mailto:ouasselmeftah@gmail.com"
            className="block text-center text-gray-400 text-sm group hover:text-primary transition-colors duration-300"
          >
            <div className="flex items-center justify-center gap-2">
              <FaCode className="group-hover:text-primary transition-colors duration-300" />
              <span>Developed by Ouassel Meftah</span>
            </div>
          </a>

          {/* Right Side - Social Icons */}
          <div className="flex gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
