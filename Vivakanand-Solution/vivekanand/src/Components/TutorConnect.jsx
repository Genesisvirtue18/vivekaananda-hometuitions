import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../api/axiosConfig"; // import BASE_URL



const TutorsConnect = () => {
  const [tutors, setTutors] = useState([]);
  const navigate = useNavigate();

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
    <div
      className="bg-cover bg-center py-8 font-inter"
      style={{ backgroundImage: "url('/Images/Tutor/connet-tutor.png')" }}
    >      {/* Global style to hide scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-2 text-left text-white flex flex-col justify-center items-start gap-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-black">
              Connect with the best tutors
            </h2>
           <button
  onClick={() => navigate("/expert")}
  className="bg-white text-black px-6 py-3 rounded-lg font-semibold text-base md:text-lg text-center
             shadow-md hover:shadow-lg hover:bg-gray-100 hover:scale-105 
             transition duration-300 ease-in-out"
>
  Get Matched with a Tutor
</button>

          </div>

          {/* Right Images */}
          <div className="lg:col-span-3">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar pb-2">
              {tutors.length > 0 ? (
                tutors.map((tutor, index) => (
                  <img
  key={index}
  src={`${BASE_URL}/uploads/${tutor.imageUrl}`}
  alt={tutor.name || `Tutor ${index + 1}`}
  className="rounded-full shadow-lg object-cover flex-shrink-0 
       w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] 
       md:w-[330px] md:h-[330px] lg:w-[350px] lg:h-[350px]"
/>

                ))
              ) : (
                <p className="text-gray-500">No tutors available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorsConnect;
