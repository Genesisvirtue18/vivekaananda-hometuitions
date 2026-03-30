// src/components/JoinTutor.jsx
import React from "react";
import { useNavigate } from "react-router-dom";


const JoinTutor = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-10 px-4 font-inter">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                {/* Left Image */}
                <div className="flex justify-center">
                    <div className="relative flex items-center justify-center overflow-visible">
                        {/* Background gradient circles */}
                        <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-[#FE6E01]/30 z-0 -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6"></div>
                        <div className="absolute w-[220px] h-[220px] md:w-[340px] md:h-[340px] rounded-full bg-[#FE6E01]/70 z-0 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6"></div>
                        <div className="absolute w-[220px] h-[220px] md:w-[340px] md:h-[340px] rounded-full bg-[#FE6E01]/50 z-0 -translate-x-5 translate-y-5 md:-translate-x-8 md:translate-y-8"></div>

                        {/* Main image */}
                        <img
                            src="/Images/Tutor/Join-tutor.jpg"
                            alt="Tutor"
                            className="rounded-full object-cover w-[180px] h-[180px] md:w-[280px] md:h-[280px] shadow-xl relative z-10"
                        />
                    </div>
                </div>

                {/* Right Content */}
                <div>
                    <h2
                        className="font-inter mt-4 font-semibold text-[22px] md:text-[25px] text-[#1E1E1E] leading-[32px] md:leading-[40px] 
             text-center md:text-left"
                    >
                        Share Your Knowledge. Shape Young Minds.
                    </h2>

                    <p
                        className="font-inter font-normal text-[14px] md:text-[16px] leading-[24px] md:leading-[30px] text-[#2B2B2B] 
             text-center md:text-left"
                    >
                        Become an offline tutor with us
                    </p>


                    {/* Why Join Us */}
                    <div className="mt-2 md:mt-4">
                        <h3 className="font-inter font-semibold text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] text-[#2B2B2B] mb-3">
                            Why Join Us?
                        </h3>

                        <div className="space-y-3 md:space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 md:h-6 md:w-6 rounded-full bg-[#FE6E01] text-white text-[12px] md:text-sm mt-0.5">
                                    ✓
                                </span>
                                <div>
                                    <p className="font-inter font-medium text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] text-[#2B2B2B]">
                                        Flexible Schedule
                                    </p>
                                    <p className="font-inter font-normal text-[13px] md:text-[14px] leading-[20px] md:leading-[21px] text-[#615F5F] mt-1">
                                        Teach at your convenience — choose the days, times, and number of students you take on.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 md:h-6 md:w-6 rounded-full bg-[#FE6E01] text-white text-[12px] md:text-sm mt-0.5">
                                    ✓
                                </span>
                                <div>
                                    <p className="font-inter font-medium text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] text-[#2B2B2B]">
                                        Earn Doing What You Love
                                    </p>
                                    <p className="font-inter font-normal text-[13px] md:text-[14px] leading-[20px] md:leading-[21px] text-[#615F5F] mt-1">
                                        Get paid for sharing your knowledge and helping students succeed in your local area.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 md:h-6 md:w-6 rounded-full bg-[#FE6E01] text-white text-[12px] md:text-sm mt-0.5">
                                    ✓
                                </span>
                                <div>
                                    <p className="font-inter font-medium text-[16px] md:text-[18px] leading-[24px] md:leading-[27px] text-[#2B2B2B]">
                                        We Bring Students to You
                                    </p>
                                    <p className="font-inter font-normal text-[13px] md:text-[14px] leading-[20px] md:leading-[21px] text-[#615F5F] mt-1">
                                        No need to hunt for work — we match you with students who need your expertise.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => navigate("/tutor#joining-tutor")}
                        className="mt-6 px-6 py-3 bg-[#FE6E01] text-white rounded-md shadow 
             hover:bg-orange-600 hover:scale-105 hover:shadow-lg 
             transition-all duration-300 font-inter font-medium text-[16px] leading-[24px]
             mx-auto md:mx-0 block"
                    >
                        Join as a tutor
                    </button>

                </div>
            </div>
        </section>
    );
};

export default JoinTutor;