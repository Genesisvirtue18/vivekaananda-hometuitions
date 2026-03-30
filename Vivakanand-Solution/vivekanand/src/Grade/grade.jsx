import React from "react";
import { FaChalkboardTeacher, FaUserCheck, FaSchool, FaMapMarkerAlt, FaUserFriends, FaClipboardCheck } from "react-icons/fa";
import NavBar from "../Components/NavBar";

const Grade = () => {
    return (
        <div className="bg-white text-gray-800 font-inter">
            {/* Navbar */}
            <NavBar />

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
                style={{ backgroundImage: "url('/Images/Grade/grade-banner.jpg')" }}
            >
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        6th-8th Class Tuitions – Build Strong Foundations for the Future
                    </h1>
                    <p className="text-md font-semibold text-[#FFFFFF]">
                        Focused, personalised teaching to help your child master Maths, Science, and Languages with confidence
                    </p>
                </div>
            </section>

            {/* Why 6th to 8th Grade are Crucial Years */}
            <section
                className="flex items-center justify-center min-h-screen px-6"
            >
                <div className="max-w-6xl w-full">
                    <h2
                        className="text-center mb-4"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontStyle: "normal",
                            fontSize: "32px",
                            lineHeight: "48px",
                            letterSpacing: "0",
                            color: "#000000",
                        }}
                    >
                        Why 6th to 8th Grade are Crucial Years
                    </h2>

                    <p
                        className="text-center max-w-3xl mx-auto mb-12"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "15px",
                            lineHeight: "27px",
                            letterSpacing: "0",
                            color: "#000000",
                        }}
                    >
                        6th to 8th grade marks the start of advanced concepts and a deeper syllabus. Our program ensures your child doesn’t just memorise, but understands and applies concepts — setting a strong base for future classes.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 items-center justify-center">
                        <img
                            src="/Images/Grade/grade-1.jpg"
                            alt="Teaching"
                            className="h-[300px] w-[478px] shadow-md mx-auto"
                        />
                        <div>
                            <h3
                                className="mb-4"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontStyle: "normal",
                                    fontSize: "28px",
                                    lineHeight: "48px",
                                    letterSpacing: "0",
                                    color: "#000000",
                                }}
                            >
                                Subjects covered
                            </h3>
                            <p
                                className="mb-4"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontStyle: "normal",
                                    fontSize: "18px",
                                    lineHeight: "20px",
                                    letterSpacing: "0",
                                    color: "#000000",
                                }}
                            >
                                Subjects We Focus On
                            </p>

                            {/* List */}
                            <ul className="space-y-2">
                                <li style={{ lineHeight: "33px" }}>
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            color: "#000000",
                                        }}
                                    >
                                        Maths:
                                    </span>{" "}
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            color: "#5B5B5B",
                                        }}
                                    >
                                        Concept-based problem solving, mental maths, and applied learning.
                                    </span>
                                </li>

                                <li style={{ lineHeight: "33px" }}>
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            color: "#000000",
                                        }}
                                    >
                                        Science:
                                    </span>{" "}
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            color: "#5B5B5B",
                                        }}
                                    >
                                        Interactive lessons in Physics, Chemistry, and Biology basics.
                                    </span>
                                </li>

                                <li style={{ lineHeight: "33px" }}>
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            color: "#000000",
                                        }}
                                    >
                                        Languages:
                                    </span>{" "}
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            color: "#5B5B5B",
                                        }}
                                    >
                                        Grammar, vocabulary building, and fluency.
                                    </span>
                                </li>

                                <li style={{ lineHeight: "33px" }}>
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            color: "#000000",
                                        }}
                                    >
                                        Social Studies:
                                    </span>{" "}
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            color: "#5B5B5B",
                                        }}
                                    >
                                        Easy-to-understand explanations for Geography, History, and Civics.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* What your child will learn */}
        <section className="flex ml-20 items-center justify-center py-12 px-6">
    <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h3
                    className="mb-4"
                    style={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontStyle: "normal",
                        fontSize: "32px",
                        lineHeight: "48px",
                        letterSpacing: "0",
                        color: "#000000",
                    }}
                >
                    What your child will learn
                </h3>
                <p
                    className="mb-4"
                    style={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: "18px",
                        lineHeight: "27px",
                        letterSpacing: "0",
                        color: "#000000",
                    }}
                >
                    Learning Outcomes
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "15px",
                            lineHeight: "33px",
                            letterSpacing: "0",
                            color: "#5B5B5B",
                        }}
                    >
                        Improved academic performance and exam readiness.
                    </li>
                    <li
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "15px",
                            lineHeight: "33px",
                            letterSpacing: "0",
                            color: "#5B5B5B",
                        }}
                    >
                        Stronger grasp of core subjects.
                    </li>
                    <li
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "15px",
                            lineHeight: "33px",
                            letterSpacing: "0",
                            color: "#5B5B5B",
                        }}
                    >
                        Better confidence in language and communication.
                    </li>
                    <li
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "15px",
                            lineHeight: "33px",
                            letterSpacing: "0",
                            color: "#5B5B5B",
                        }}
                    >
                        Positive learning habits that last.
                    </li>
                </ul>
            </div>
            <img
                src="/Images/Grade/grade-2.jpg"
                alt="Child learning"
                className="h-[250px] w-[350px] object-cover shadow-md mx-auto"
            />
        </div>
    </div>
</section>

            {/* Fee Structure */}
            <section className="py-12 px-6 max-w-6xl mx-auto">
                <h2
                    className="text-center mb-8"
                    style={{
                        fontFamily: "Inter",
                        fontWeight: 600, // Semi Bold
                        fontStyle: "normal",
                        fontSize: "25px",
                        lineHeight: "48px",
                        letterSpacing: "0",
                        color: "#000000",
                    }}
                >
                    Class 6-8 Fee Structure
                </h2>


                {/* Fee Table */}
                <div className="overflow-x-auto rounded-2xl mb-8">
                    <table
                        className="w-full border border-gray-200 rounded-lg"
                        style={{
                            boxShadow: "0px 4px 4px 0px #FFFFFF40",
                        }}
                    >
                        <thead>
                            <tr className="bg-orange-500">
                                <th
                                    className="py-3 px-4 text-center border-r-2 border-black"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 500, // Medium
                                        fontStyle: "normal",
                                        fontSize: "15px",
                                        lineHeight: "33px",
                                        letterSpacing: "0",
                                        color: "#000000",
                                    }}
                                >
                                    Class
                                </th>
                                <th
                                    className="py-3 px-4 text-center border-r-2 border-black"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 500,
                                        fontStyle: "normal",
                                        fontSize: "15px",
                                        lineHeight: "33px",
                                        letterSpacing: "0",
                                        color: "#000000",
                                    }}
                                >
                                    Fee Per Month
                                </th>
                                <th
                                    className="py-3 px-4 text-center"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 500,
                                        fontStyle: "normal",
                                        fontSize: "15px",
                                        lineHeight: "33px",
                                        letterSpacing: "0",
                                        color: "#000000",
                                    }}
                                >
                                    Total
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {["6th Class", "7th Class", "8th Class"].map((cls, idx) => (
                                <tr key={idx} className="text-center">
                                    <td
                                        className="py-3 px-4"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontStyle: "normal",
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            letterSpacing: "0",
                                            color: "#1E1E1E",
                                        }}
                                    >
                                        {cls}
                                    </td>
                                    <td
                                        className="py-3 px-4"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontStyle: "normal",
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            letterSpacing: "0",
                                            color: "#1E1E1E",
                                        }}
                                    >
                                        1000
                                    </td>
                                    <td
                                        className="py-3 px-4"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontStyle: "normal",
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            letterSpacing: "0",
                                            color: "#1E1E1E",
                                        }}
                                    >
                                        12000
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

                {/* Session Options */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-[#FF6B35] text-black">
                                <th
                                    className="py-3 px-4 text-center border-r-2 border-black"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 500, // Medium
                                        fontStyle: "normal",
                                        fontSize: "15px",
                                        lineHeight: "33px",
                                        letterSpacing: "0",
                                        color: "#000000",
                                    }}
                                >
                                    Select Number of Weekly Session
                                </th>
                                <th
                                    className="py-3 px-4 text-center border-r-2 border-black"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 500,
                                        fontStyle: "normal",
                                        fontSize: "15px",
                                        lineHeight: "33px",
                                        letterSpacing: "0",
                                        color: "#000000",
                                    }}
                                >
                                    Fee Per Session
                                </th>
                                <th
                                    className="py-3 px-4 text-center"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 500,
                                        fontStyle: "normal",
                                        fontSize: "15px",
                                        lineHeight: "33px",
                                        letterSpacing: "0",
                                        color: "#000000",
                                    }}
                                >
                                    Estimated Monthly Fee
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr className="text-center">
                                <td
                                    className="py-3 px-4 text-center"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 500,
                                        fontStyle: "normal",
                                        fontSize: "15px",
                                        lineHeight: "33px",
                                        letterSpacing: "0",
                                        color: "#000000",
                                    }}
                                >
                                    2 Sessions/week –
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontStyle: "normal",
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            letterSpacing: "0",
                                            color: "#5B5B5B",
                                        }}
                                    >
                                        {" "}Light revision & homework help
                                    </span>
                                </td>
                                <td style={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontStyle: "normal",
                                    fontSize: "15px",
                                    lineHeight: "33px",
                                    letterSpacing: "0",
                                    color: "#000000",
                                }}>₹500</td>
                                <td style={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontStyle: "normal",
                                    fontSize: "15px",
                                    lineHeight: "33px",
                                    letterSpacing: "0",
                                    color: "#000000",
                                }}>₹4000</td>
                            </tr>

                            <tr className="text-center">
                                <td
                                    className="py-3 px-4 text-center"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 500,
                                        fontStyle: "normal",
                                        fontSize: "15px",
                                        lineHeight: "33px",
                                        letterSpacing: "0",
                                        color: "#000000",
                                    }}
                                >
                                    3 Sessions/week –
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontStyle: "normal",
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            letterSpacing: "0",
                                            color: "#5B5B5B",
                                        }}
                                    >
                                        {" "}Balanced learning & regular practice
                                    </span>
                                </td>
                                <td style={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontStyle: "normal",
                                    fontSize: "15px",
                                    lineHeight: "33px",
                                    letterSpacing: "0",
                                    color: "#000000",
                                }}>Rs 499</td>
                                <td style={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontStyle: "normal",
                                    fontSize: "15px",
                                    lineHeight: "33px",
                                    letterSpacing: "0",
                                    color: "#000000",
                                }}>Rs 2000</td>
                            </tr>
                            <tr className="text-center">
                                <td
                                    className="py-3 px-4 text-center"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 500,
                                        fontStyle: "normal",
                                        fontSize: "15px",
                                        lineHeight: "33px",
                                        letterSpacing: "0",
                                        color: "#000000",
                                    }}
                                >
                                    5 Sessions/week –
                                    <span
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 500,
                                            fontStyle: "normal",
                                            fontSize: "15px",
                                            lineHeight: "33px",
                                            letterSpacing: "0",
                                            color: "#5B5B5B",
                                        }}
                                    >
                                        {" "}Intensive prep & daily guidance
                                    </span>
                                </td>
                                <td style={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontStyle: "normal",
                                    fontSize: "15px",
                                    lineHeight: "33px",
                                    letterSpacing: "0",
                                    color: "#000000",
                                }}>Rs 499</td>
                                <td style={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontStyle: "normal",
                                    fontSize: "15px",
                                    lineHeight: "33px",
                                    letterSpacing: "0",
                                    color: "#000000",
                                }}>Rs 2000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Our Bright Students */}
         

        </div>
    );
};

export default Grade;
