import React from "react";
import { useNavigate } from "react-router-dom";



const StepsSection = () => {
    const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Submit a Request",
      desc: "Let us know your learning goals and preferences",
      icon: "/Images/Icons/icons-1.png",
    },
    {
      id: 2,
      title: "Get Tutor Suggestions",
      desc: "We’ll send you matching offline tutors in your area",
      icon: "/Images/Icons/icons-2.png",
    },
    {
      id: 3,
      title: "Book a Trial Session",
      desc: "Experience the teaching style before committing",
      icon: "/Images/Icons/icons-3.png",
    },
    {
      id: 4,
      title: "Start Learning",
      desc: "Begin regular sessions and track your progress",
      icon: "/Images/Icons/icons-4.png",
    },
  ];

  return (
    <div className="py-10 px-6 text-center font-inter">
      <h2 className="text-[24px] md:text-[28px] lg:text-[32px] leading-[40px] font-semibold text-center mb-12">
        Your Learning Journey in 3 Simple Steps
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div className="flex flex-col items-center text-center">
              <div
                className="bg-[#FE6E01] w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundImage: `url('${step.icon}')`,
                  backgroundSize: "60%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
              <p className="text-[#FE6E01] mt-2">Step {step.id}</p>
              <h4 className="font-semibold mt-2">{step.title}</h4>
              <p className="text-sm mt-1">{step.desc}</p>
            </div>

            {/* Arrow (skip after last step) */}
            {index < steps.length - 1 && (
              <img
                src="/Images/Icons/arrow-1.png"
                alt="arrow"
                className="self-center w-5 h-5 md:w-7 md:h-7 
                  md:rotate-0 rotate-90 transition-transform"
              />
            )}
          </React.Fragment>
        ))}
      </div>

       <button
                onClick={() => navigate("/demo#book-demo-section")}
      className="mt-10 bg-[#FE6E01] text-white px-4 py-2 rounded-lg font-semibold 
                 hover:bg-orange-600 hover:scale-105 transition-transform transition-colors duration-300"
    >
      Book Demo Class
    </button>
    </div>
  );
};

export default StepsSection;
