import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import { FaCheckCircle } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import { CheckCircle } from "lucide-react";



const Tutor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        if (location.hash) {
            const section = document.querySelector(location.hash);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    const details = [
        "We take 50% of your 1st month’s salary as a placement fee.",
        "From the 2nd month onwards, you will receive 100% of your earnings.",
        "Profile verification may take up to 2 days. Please wait patiently.",
    ];

    const faqs = [
        {
            question: "Why should I join Vivekaananda Home Tuitions as a tutor?",
            answer: "We provide consistent opportunities, timely payments, and professional respect. Unlike freelancing, we connect you with the right students so you can focus on teaching."
        },
        {
            question: "Will I get regular tuition opportunities?",
            answer: "Yes. We work with hundreds of parents across Hyderabad and continuously receive new requests. As a registered tutor, you’ll get regular student assignments based on your subject expertise and location."
        },
        {
            question: "Do I have to pay any commission or hidden charges?",
            answer: "No. We believe in transparent and fair policies. Tutors are paid directly for their work, with no hidden deductions."
        },
        {
            question: "How does Vivekaananda Home Tuitions support tutors?",
            answer: "We support tutors with student connections tailored to their expertise, guidance on teaching strategies, timely payments, and professional handling."
        },
        {
            question: "Can I handle multiple students at once?",
            answer: "Yes, if you wish. Many tutors choose to take multiple assignments across different areas, depending on their availability and schedule flexibility."
        },
        {
            question: "Will I get recognition for my work?",
            answer: "Definitely. Outstanding tutors are recognized, rewarded, and prioritized for future assignments."
        },
        {
            question: "What makes your academy different for tutors?",
            answer: "We are not just a tuition provider — we are a community of educators. At Vivekaananda, tutors get respect, security, and opportunities to build a strong career in teaching."
        }
    ];


    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white text-gray-800 font-inter">
            {/* Navbar */}
            <NavBar />

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
                style={{ backgroundImage: "url('/Images/Tutor/Join-tutor.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        Shape Young Minds. Build Your <br /> Career.
                    </h1>
                    <p className="text-md font-semibold text-[#FFFFFF]">
                        Join our network of passionate tutors and make a difference
                    </p>
                </div>
            </section>

            {/* Why Teach with Us Section */}
            <section className="py-10 px-6 bg-[#F9FAFB] flex items-center justify-center">
                <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-8">
                    {/* Left Content */}
                    <div className="flex flex-col items-center text-center md:text-left gap-6">
                        <h2
                            className="text-black"
                            style={{
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                fontSize: '32px',
                                lineHeight: '40px',
                            }}
                        >
                            Why Teach with Us
                        </h2>

                        <p
                            style={{
                                fontFamily: 'Inter',
                                fontWeight: 400,
                                fontSize: '18px',
                                lineHeight: '30px',
                                color: '#2B2B2B',
                            }}
                        >
                            Benefits of joining as a tutor
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 justify-center">
                            {[{
                                title: "Flexible Schedule",
                                text: "We understand that every tutor has a different routine, so we let you choose the days and times that work best for you."
                            }, {
                                title: "Good Earnings",
                                text: "Your knowledge and time are valuable, and we make sure you’re rewarded fairly."
                            }, {
                                title: "Teaching Support",
                                text: "We provide lesson materials, tips, and guidance so you can focus on delivering great classes."
                            }, {
                                title: "Impact Lives",
                                text: "Every class you teach is a chance to change a student’s life."
                            }].map((card, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow text-center w-[260px]">
                                    <FaCheckCircle className="text-[#FE6E01] w-8 h-8 mx-auto mb-3" />
                                    <h4 className="mb-2 font-semibold text-lg text-black">{card.title}</h4>
                                    <p className="text-sm text-gray-600">{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center mt-6 md:mt-0">
                        <video
                            src="/Images/Teacher/real-tutor-1.mp4" // <-- replace with your video path
                            className="shadow-lg object-cover w-[350px] h-[300px] rounded-lg"
                            autoPlay
                            loop
                            muted
                            controls
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-10 px-4 bg-[#FFFFFF] flex justify-center items-center">
                <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left">

                    {/* Left Image */}
                    <div className="flex justify-center w-full md:w-auto">
                        <video
                            src="/Images/Teacher/real-tutor-2.mp4" // <-- replace with your video path
                            className="shadow-lg object-cover w-[350px] h-[300px] rounded-lg"
                            autoPlay
                            loop
                            muted
                            controls
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Right Content */}
                    <div className="w-full md:w-1/2">
                        <h2 className="font-inter font-semibold text-[24px] md:text-[28px] leading-[34px] md:leading-[40px] text-[#1E1E1E] mb-4">
                            How it Works?
                        </h2>

                        <p className="text-[#2B2B2B] mb-6 text-[16px]">
                            Easy and hassle free onboarding
                        </p>

                        <ul className="space-y-4">
                            {[
                                { num: "1", title: "Fill the Application Form", desc: "– Share your details & experience" },
                                { num: "2", title: "Screening & Demo", desc: "– Short interview + teaching demo" },
                                { num: "3", title: "Onboarding", desc: "– Get matched with students" },
                                { num: "4", title: "Start Teaching", desc: "– Begin classes and track progress" }
                            ].map((step, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="bg-[#FE6E01] text-white min-w-[25px] min-h-[25px] flex items-center justify-center rounded-full mr-3 font-bold text-[14px]">
                                        {step.num}
                                    </span>
                                    <p className="text-left">
                                        <strong className="font-inter font-medium text-[16px] md:text-[18px] leading-[24px] md:leading-[27px]">
                                            {step.title}
                                        </strong>
                                        <span className="font-inter font-normal text-[14px] md:text-[16px] text-gray-600">
                                            {" "}{step.desc}
                                        </span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>



            {/* Quick Booking Form */}
            <section id="joining-tutor"
                className="py-10">
                <div className="max-w-lg mx-auto text-center">
                    <h2 className="font-inter font-semibold text-[32px] leading-[48px] tracking-normal text-black text-center mb-8">
                        Interested in joining as a tutor? Let’s start with the basics.
                    </h2>
                    <button
                        onClick={() => navigate("/tutor-registration")}
                        className="px-14 py-3 mb-5 
             bg-[#FE6E01] text-white
             rounded-xl shadow-md 
             font-inter font-medium text-[14px] leading-[21px] tracking-normal
             transition-all duration-300 ease-in-out
             hover:bg-[#e6511d] hover:text-white hover:shadow-lg hover:scale-105"
                    >
                        Join as a Tutor Now
                    </button>

                </div>
            </section>

            <section className="mb-10 p-6 max-w-3xl mx-auto text-left">
                <h2
                    className="font-inter font-medium text-[24px] leading-[30px] text-gray-800 mb-4 tracking-normal"
                >
                    Kindly take a moment to review the following important details:
                </h2>


                <ul className="space-y-3">
                    {details.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="text-orange-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                            <span className="font-inter font-normal text-[16px] leading-[24px] tracking-normal text-[#2B2B2B]">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>



            {/* FAQ Section */}
            <section className="py-10 px-6 bg-[#F1F1F1]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="font-inter font-semibold text-[25px] leading-[48px] text-center mb-2">
                            We are here to answer your questions
                        </h3>
                        <p className="font-inter font-normal text-[15px] leading-[27px] text-center text-gray-600 max-w-2xl mx-auto">
                            Have Questions About Our Home Tuitions? Here’s Everything You Need to
                            Know Before You Get Started
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* Left - FAQ */}
                        <div className="flex flex-col justify-between bg-transparent">
                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg p-4 bg-white hover:shadow transition"
                                    >
                                        {/* Question Row */}
                                        <div
                                            className="flex justify-between items-center cursor-pointer"
                                            onClick={() => toggleFAQ(index)}
                                        >
                                            <span className="font-inter font-semibold text-[16px] leading-[24px] tracking-normal text-gray-800">
                                                {faq.question}
                                            </span>
                                            <FiPlus
                                                className={`w-6 h-6 p-1 rounded-full bg-[#FE6E01] text-white transition-transform ${openIndex === index ? "rotate-45" : ""
                                                    }`}
                                            />
                                        </div>

                                        {/* Answer Section */}
                                        {openIndex === index && (
                                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Right - Image */}
                        <div className="flex justify-center">
                            <img
                                src="/Images/Teacher/tutor-faq.jpg"
                                alt="Tutor"
                                className="rounded-xl shadow-lg object-cover w-full max-h-[450px]"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Tutor;
