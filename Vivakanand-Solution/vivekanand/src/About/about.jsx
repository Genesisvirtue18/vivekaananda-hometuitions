import React, { useState } from "react";
import { FaChalkboardTeacher, FaUserCheck, FaSchool, FaMapMarkerAlt, FaUserFriends, FaClipboardCheck } from "react-icons/fa";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";


const About = () => {
  // Assuming your tuition service started in 2013
const startingYear = 2014;
const currentYear = new Date().getFullYear();
const yearsOfService = currentYear - startingYear;

  const images = [
    "/Images/BrightStudent/bright-student-1.jpg",
    "/Images/BrightStudent/bright-student-2.jpg",
    "/Images/BrightStudent/bright-student-3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white text-gray-800 font-inter">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/Images/About/about-banner.jpg')" }}
      >
        {/* Black overlay with opacity */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

       <div className="relative z-10 max-w-3xl mx-auto px-4">
  <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
    Trusted Home Tuitions in Hyderabad <br /> for Over {yearsOfService} Years
  </h1>
  <p className="text-md font-semibold text-[#FFFFFF]">
    Empowering students from Nursery to Class 12 through <br /> personalized, offline learning at home.
  </p>
</div>

      </section>

      {/* About Section */}
      <section className="w-full max-w-4xl px-4 sm:px-6 py-12 md:py-16 mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Heading */}
          <div className="md:w-1/2 flex items-center justify-center md:justify-start">
            <h2 className="text-2xl font-medium leading-snug text-center md:text-left">
              A Decade of Trusted Home <br /> Tutoring in Hyderabad
            </h2>
          </div>

          {/* Right Column - Text */}
          <div className="md:w-1/2">
            <p className="text-gray-700 font-normal leading-relaxed mb-4">
              We are a dedicated team of experienced educators providing
              one-on-one home tuitions in and around Chanda Nagar, Hyderabad.
              Founded in 2012, Vivekananda Home Tuitions has helped hundreds of
              students across various boards (CBSE, ICSE, and State) improve
              their grades, build strong foundations, and regain confidence in
              learning.
            </p>
            <p className="text-gray-700 font-normal leading-relaxed">
              Whether your child is just starting in Nursery or preparing for
              critical Class 10 and 12 board exams, we provide tailored tutoring
              solutions that suit each student's pace and style.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-5">
        {/* Left Image */}
        <img
          src="/Images/About/about-display-1.jpg"
          alt="Left"
          className="w-full md:w-1/2 h-[250px] md:h-[300px] object-cover rounded-lg"
        />

        {/* Right Image */}
        <img
          src="/Images/About/about-display-2.jpg"
          alt="Right"
          className="w-full md:w-1/2 h-[250px] md:h-[300px] object-cover rounded-lg"
        />
      </section>







      {/* Why Choose Us Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
          <div className="flex flex-wrap justify-center gap-y-8">
            {/* Card 1 */}
            <div className="bg-white p-10 h-[280px] w-[280px] rounded-2xl shadow hover:shadow-lg transition mx-4">
              <img
                src="/Images/About/about-icon-1.png"
                alt="Tutoring Icon"
                className="w-14 h-14 mb-4 mx-auto"
              />
              <h3 className="font-semibold text-lg mb-2">11+ Years of Tutoring Excellence</h3>
              <p className="text-[#4E4E4E] text-sm">
                We've been helping students <br /> succeed since 2012 with proven teaching methods and <br /> consistent results.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 h-[280px] w-[280px] rounded-2xl shadow hover:shadow-lg transition mx-4">
              <img
                src="/Images/About/about-icon-2.png"
                alt="Tutoring Icon"
                className="w-14 h-14 mb-4 mx-auto"
              />
              <h3 className="font-semibold text-lg mb-2">Verified & Experienced Tutors</h3>
              <p className="text-[#4E4E4E] text-sm">
                Our tutors are carefully selected <br /> for their subject expertise, <br /> teaching skills, and <br />student-friendly approach.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 w-[280px] h-[280px] rounded-2xl shadow hover:shadow-lg transition mx-4">
              <img
                src="/Images/About/about-icon-3.png"
                alt="Tutoring Icon"
                className="w-14 h-14 mb-4 mx-auto"
              />
              <h3 className="font-semibold text-lg mb-2">Covers Nursery to <br /> Class 12</h3>
              <p className="text-[#4E4E4E] text-sm">
                From early learning to board exam preparation, we support all academic levels across major boards.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-10 w-[280px] h-[280px] rounded-2xl shadow hover:shadow-lg transition mx-4">
              <img
                src="/Images/About/about-icon-4.png"
                alt="Tutoring Icon"
                className="w-14 h-14 mb-4 mx-auto"
              />
              <h3 className="font-semibold text-lg mb-2">Local & Trusted in Hyderabad</h3>
              <p className="text-[#4E4E4E] text-sm">
                We serve families in Hyderabad with home visits and strong community recommendations.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-10 w-[280px] h-[280px] rounded-2xl shadow hover:shadow-lg transition mx-4">
              <img
                src="/Images/About/about-icon-5.png"
                alt="Tutoring Icon"
                className="w-14 h-14 mb-4 mx-auto"
              />
              <h3 className="font-semibold text-lg mb-2">Personalized Attention at Home</h3>
              <p className="text-[#4E4E4E] text-sm">
                Every student gets one-on-one support tailored to their pace, goals, and learning style.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-10 w-[280px] h-[280px] rounded-2xl shadow hover:shadow-lg transition mx-4">
              <img
                src="/Images/About/about-icon-6.png"
                alt="Tutoring Icon"
                className="w-14 h-14 mb-4 mx-auto"
              />
              <h3 className="font-semibold text-lg mb-2">Regular Parent Feedback & Reports</h3>
              <p className="text-[#4E4E4E] text-sm">
                We keep you updated with consistent communication and monthly academic progress updates.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Vision & Mission */}
      <section
        className="relative h-[350px] mb-2 font-inter bg-[url('/Images/About/about-banner-2.jpg')] bg-cover bg-center bg-no-repeat"
      >
        {/* Gradient Overlay (Orange → Transparent) */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/60 to-transparent"></div>

        {/* Centered Content */}
        <div className="relative flex items-center justify-center h-full px-6">
          <div className="max-w-4xl text-center text-white">
            <h2 className="text-3xl font-semibold mb-6">Our Vision & Mission</h2>
            <p className="font-inter font-normal text-md leading-[30px] text-center">
              We believe every child learns differently. Our mission is to make
              quality offline education accessible, personal, and effective—right
              at your doorstep. We focus on building confidence, strengthening
              concepts, and helping students succeed not just in exams but in
              life.
            </p>
          </div>
        </div>
      </section>



      {/* Carousel Section */}

      {/* Carousel Section */}




      <Footer />
    </div>
  );
};

export default About;
