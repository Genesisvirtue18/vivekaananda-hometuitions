import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



import "swiper/css";
import "swiper/css/pagination";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="h-[100vh]"
    >
      {/* ===== SLIDE 1 (Keep design same) ===== */}
      <SwiperSlide>
        <section
          className="relative bg-cover bg-center min-h-[100vh] flex items-center text-white font-inter"
          style={{ backgroundImage: "url('/Images/HeroSection/hero-section.jpg')" }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-60"></div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl px-6 md:px-12 lg:ml-16 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-snug">
              Achieve Academic Success <br className="hidden sm:block" /> with Top Offline Tutors
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8">
              Experienced instructors for board exams, test prep, and <br className="hidden sm:block" /> advanced subjects.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/demo#book-demo-section")}
                className="bg-[#FE6E01] text-white px-6 py-3 rounded-lg shadow-md 
             hover:bg-orange-600 hover:scale-105 transition-transform transition-colors duration-300
             font-inter font-normal text-[16px] leading-6 tracking-normal"
              >
                Book Demo class
              </button>




              <button
                onClick={() => navigate("/about")}
                className="border border-white poppins-regular px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Floating Contact Buttons */}
             <div className="absolute lg:top-1/2 right-0 -translate-y-1/2  flex flex-col z-10 -bottom-20">
            <a
              href="https://wa.me/919059746820"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#FE6E01] hover:bg-orange-600 text-white flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-tl-2xl">
                <FaWhatsapp size={20} />
                <span className="text-[10px] sm:text-xs mt-1 text-center">Whatsapp</span>
              </button>
            </a>


            <a href="tel:9059746820">
              <button className="bg-[#FE6E01] hover:bg-orange-600 text-white flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
                <FaPhoneAlt size={20} />
                <span className="text-[10px] sm:text-xs mt-1 text-center">Call Us</span>
              </button>
            </a>

            <Link to="/contact">
              <button className="bg-[#FE6E01] hover:bg-orange-600 text-white flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-bl-2xl">
                <FaEnvelope size={20} />
                <span className="text-[10px] sm:text-xs mt-1 text-center">Contact</span>
              </button>
            </Link>
          </div>
        </section>
      </SwiperSlide>

      {/* ===== SLIDE 2 ===== */}

      <SwiperSlide>
        <div
          className="relative bg-cover bg-center min-h-[100vh] flex items-center text-white"
          style={{ backgroundImage: "url('/Images/HeroSection/hero-section-2.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-2xl px-6 md:px-12 lg:ml-16 text-center md:text-left">
            <h1
              className="font-inter font-semibold text-[32px] leading-[45px] tracking-normal mb-4"
            >
              Personalized Home Tuitions for Every Grade & Subject
            </h1>

            <p className="font-inter font-medium text-[18px] leading-[30px] tracking-normal text-white mb-6">
              From foundational subjects to board exam prep – we cover Math, Science, English, Languages, and more.
            </p>
            <button
              onClick={() =>
                document.getElementById("courses-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#FF5D21] text-white rounded-[8px] px-6 py-3 font-inter shadow-md hover:bg-orange-600 hover:scale-105 transition"
            >
              Explore Subjects
            </button>



          </div>
        </div>
      </SwiperSlide>

      {/* ===== SLIDE 3 ===== */}



    </Swiper>
  );
};

export default HeroSection;
