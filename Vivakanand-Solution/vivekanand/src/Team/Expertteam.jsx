import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import api, { BASE_URL } from "../api/axiosConfig"; // import BASE_URL


const About = () => {
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await api.get("/api/tutors"); // call your backend
                setTutors(response.data);
            } catch (error) {
                console.error("Error fetching tutors:", error);
            }
        };

        fetchTutors();
    }, []);


    return (
        <div className="bg-white text-gray-800 font-inter">
            {/* Navbar */}
            <NavBar />

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
                style={{ backgroundImage: "url('/Images/About/about-banner.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-70"></div>

                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        Meet Our Expert Tutors
                    </h1>
                    <p className="text-md font-semibold text-[#FFFFFF]">
                        Experienced, passionate, and dedicated to helping students succeed
                    </p>
                </div>
            </section>

            {/* Team Cards Section */}
            <section className="py-16  px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-12">
                    Meet Our Tutors
                </h2>

             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 py-10 bg-gray-50">
  {tutors.length > 0 ? (
    tutors.map((tutor) => (
      <div
        key={tutor.id}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300 p-6 text-center"
      >
        {/* Image wrapper */}
        <div className="w-42 h-42 mx-auto rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
          <img
            src={`${BASE_URL}/uploads/${tutor.imageUrl}`}
            alt={tutor.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Tutor Info */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">{tutor.name}</h3>

          <p className="text-sm text-gray-600 mt-1">
            Specialised Subjects: {tutor.subject}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            <span>Qualification: {tutor.classes}</span>
            <br />
            <span>{tutor.experience} years of Experience</span>
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Location: {tutor.location}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 col-span-4">No tutors found</p>
  )}
</div>


            </section>
        </div>
    );
};

export default About;
