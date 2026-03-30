import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ background = "bg-white/20" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "For Parents", path: "/demo" },
    { name: "For Tutors", path: "/tutor" },
    { name: "Fee Structure", path: "/fee-details" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`absolute top-0 left-0 w-full z-20 font-montserrat  h-16 ${background}`}>
      <div className="flex items-center justify-between h-full pl-6 md:pl-12">
        {/* Logo */}
        <img
          src="/Images/Logo/logo.png" // Replace with your logo path
          alt="Vivekanand Home Tuitions Logo"
          className="h-10 md:h-12"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 font-semibold items-center mx-auto">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`relative text-white no-underline transition duration-300 
                ${location.pathname === item.path
                    ? "after:block after:h-[2px] after:bg-[#FE6E01] after:w-full"
                    : "hover:text-[#FE6E01]"
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Admission Helpline - Now touches the right edge */}
        <div className="hidden md:flex bg-[#FE6E01] flex-col justify-center text-white font-semibold h-full px-6 ml-auto mr-0">
          <p className="text-sm">Call Us</p>  {/* changed text */}
          <a href="tel:+919059746820" className="font-bold hover:underline">
            +91 9059746820
          </a>

        </div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white mr-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm px-6 py-4">
          <ul className="flex flex-col space-y-4 font-semibold">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`block text-gray-800 no-underline transition duration-300 
                  ${location.pathname === item.path
                      ? "text-[#FE6E01] font-bold"
                      : "hover:text-[#FE6E01]"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Admission Helpline in Mobile */}
          <div className="mt-4 bg-[#FE6E01] rounded-lg p-3 text-white font-semibold text-center">
            <p className="text-sm">Call Us</p>
            <span className="font-bold">+91 9059746820</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;