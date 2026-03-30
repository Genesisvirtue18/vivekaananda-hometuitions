// src/pages/TutorRegistration.jsx
import React, { useState } from "react";
import Navbar from "../Components/NavBar";
import api from "../api/axiosConfig"; // adjust the path if needed
import { ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";




const steps = [
    { id: 1, title: "Personal Details" },
    { id: 2, title: "Location Details" },
    { id: 3, title: "Tutoring Profile" },
    { id: 4, title: "Contact Information" },
    { id: 5, title: "Additional Information" },
    { id: 6, title: "Upload Documents" },
];

const subjectOptions = [
    "All Subject",
    "Maths & Science",
    "Maths",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Hindi",
    "Telgu",
    "Accountancy",
    "Civics",
    "Commerce",
];


// Initial form state for resetting
const initialFormState = {
    name: "",
    fatherName: "",
    qualification: "",
    university: "",
    percentage: "",
    passingYear: "",
    interCollege: "",
    interPercentage: "",
    schoolName: "",
    currentLocation: "",
    preferredLocation: "",
    classesHandled: "",
    subjectsTaught: [], // array of selected subjects
    previousTutoringExperience: "",
    classesTaught: "",
    phone: "",
    altPhone: "",
    hasBike: "",
    syllabus: "",
    languages: [{ language: "", proficiency: "" }],
    photo: null,
    aadhar: null,
};

const TutorRegistration = () => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [subjectsDropdownOpen, setSubjectsDropdownOpen] = useState(false);
    const subjectsDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                subjectsDropdownRef.current &&
                !subjectsDropdownRef.current.contains(event.target)
            ) {
                setSubjectsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const handleLanguageChange = (index, field, value) => {
        const updatedLanguages = [...formData.languages];
        updatedLanguages[index][field] = value;
        setFormData({ ...formData, languages: updatedLanguages });
    };

    // Add new language row
    const addLanguage = () => {
        setFormData({
            ...formData,
            languages: [...formData.languages, { language: "", proficiency: "" }],
        });
    };

    // Remove a language row
    const removeLanguage = (index) => {
        const updatedLanguages = formData.languages.filter((_, i) => i !== index);
        setFormData({ ...formData, languages: updatedLanguages });
    };


    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.name) newErrors.name = "Name is required";
            if (!formData.fatherName) newErrors.fatherName = "Father's name is required";
            if (!formData.qualification) newErrors.qualification = "Qualification is required";
            if (!formData.university) newErrors.university = "University is required";
            if (!formData.percentage) newErrors.percentage = "Percentage is required";
            if (!formData.passingYear) {
                newErrors.passingYear = "Passing year is required";
            } else if (!/^\d{4}$/.test(formData.passingYear)) {
                newErrors.passingYear = "Year must be 4 digits";
            }
            if (!formData.interCollege) newErrors.interCollege = "Intermediate college is required";
            if (!formData.interPercentage) newErrors.interPercentage = "Intermediate percentage is required";
            if (!formData.schoolName) newErrors.schoolName = "School name is required";
        }

        if (step === 2) {
            if (!formData.currentLocation) newErrors.currentLocation = "Current location is required";
            if (!formData.preferredLocation) newErrors.preferredLocation = "Preferred location is required";
        }

        if (step === 3) {
            if (!formData.classesHandled) newErrors.classesHandled = "Classes handled is required";
            if (!formData.subjectsTaught) newErrors.subjectsTaught = "Subjects taught is required";
            if (!formData.previousTutoringExperience) newErrors.previousTutoringExperience = "Experience is required";
            if (!formData.classesTaught) newErrors.classesTaught = "Classes taught is required";
        }

        if (step === 4) {
            // WhatsApp Number: Required + must be 10 digits
            if (!formData.phone) {
                newErrors.phone = "WhatsApp number is required";
            } else if (formData.phone.length !== 10) {
                newErrors.phone = "WhatsApp number must be 10 digits";
            }

            // Alternative Number: Optional, but if provided must be 10 digits
            if (formData.altPhone) {
                if (formData.altPhone.length !== 10) {
                    newErrors.altPhone = "Alternative phone must be 10 digits";
                }
            }
        }

        if (step === 5) {
            if (!formData.hasBike) newErrors.hasBike = "This field is required";
            if (!formData.syllabus) newErrors.syllabus = "Syllabus is required";

            // Validate languages array
           formData.languages.forEach((lang, index) => {
        if (!lang.language) newErrors[`language_${index}`] = "Language is required";
        if (!lang.proficiency) newErrors[`proficiency_${index}`] = "Proficiency is required";
    });

    if (formData.languages.length === 0) {
        newErrors.languages = "At least one language is required";
    }

            if (formData.languages.length === 0) {
                newErrors.languages = "At least one language is required";
            }
        }


        if (step === 6) {
            if (!formData.photo) newErrors.photo = "Photo is required";
            if (!formData.aadhar) newErrors.aadhar = "Aadhar is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }


        // Clear error when field is filled
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };



    const handleNext = () => {
        if (validateStep(step)) {
            setStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();



        if (validateStep(step)) {
            const formDataToSend = new FormData();

            // Append DTO as JSON blob
            const dto = {
                ...formData,
                subjectsTaught: formData.subjectsTaught,
                languages: formData.languages,
            };
            formDataToSend.append(
                "dto",
                new Blob([JSON.stringify(dto)], { type: "application/json" })
            );

            console.log(JSON.stringify(dto));


            // Append files separately
            if (formData.photo) formDataToSend.append("photo", formData.photo);
            if (formData.aadhar) formDataToSend.append("aadhar", formData.aadhar);

            try {
                const response = await api.post("/api/tutors/apply", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (response.status === 200) {
                    setIsSubmitted(true);
                    setFormData(initialFormState);
                    setStep(1);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("Something went wrong. Please try again.");
            }
        }
    };


    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            {/* Success Modal Overlay */}
            {isSubmitted && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md sm:max-w-lg lg:max-w-xl text-center relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 sm:h-7 sm:w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Big Tick Icon */}
                        <div className="flex items-center justify-center mb-4 sm:mb-6">
                            <div className="bg-[#FE6E01] rounded-full p-4 sm:p-5 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="white"
                                    className="w-10 h-10 sm:w-12 sm:h-12"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="font-inter font-semibold text-[22px] sm:text-[25px] leading-[30px] sm:leading-[36px] text-black mb-2 sm:mb-3">
                            Congratulations
                        </h2>
                        <p className="font-inter font-semibold text-[16px] sm:text-[18px] leading-[24px] sm:leading-[27px] text-[#FE6E01] mb-2">
                            Your application has been submitted
                        </p>
                        <p className="font-inter font-medium text-[14px] sm:text-[14px] leading-[21px] sm:leading-[27px] text-[#1E1E1E] mb-4 sm:mb-5">
                            After successfully reviewing your application, we will connect with you.
                        </p>

                        {/* Guidelines */}
                        <h3 className="font-semibold text-left text-[#232323] mb-2 mt-4 sm:mt-5 text-sm sm:text-base">
                            Guidelines for Demo Classes:
                        </h3>
                        <ul className="text-left text-sm sm:text-base space-y-3 text-[#1E1E1E]">
                            {[
                                "Each registered tutor will be offered three demo class opportunities. You are expected to be selected in at least one to continue receiving tuition assignments.",
                                "Please confirm the location of the tuition before agreeing to the demo. Proceed only if the travel is feasible for you.",
                                "Prior to attending a demo session, ensure you are thoroughly familiar with the student's syllabus and curriculum, and that you possess strong subject knowledge.",
                            ].map((text, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 mt-1 sm:mt-0.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={3}
                                            stroke="white"
                                            className="w-4 h-4 sm:w-5 sm:h-4"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </span>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white">
                <div className="absolute inset-0 bg-black/50"></div>
                <img
                    src="/Images/Teacher/teach-1.jpg"
                    alt="Tutor Banner"
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Join as a tutor with us
                    </h1>
                    <p className="text-lg mt-2">
                        Fill the form and begin the journey to teach with us
                    </p>
                </div>
            </div>

            {/* Main Form */}
            <div className="max-w-3xl mx-auto py-10 px-6 rounded-lg relative z-10">
                <h2 className="font-inter font-semibold text-[32px] leading-[36px] tracking-[0] text-black text-center mb-8">
                    Quick Booking Form
                </h2>

                {steps.map((s) => (
                    <div key={s.id} className="mb-4 border-b-1 border-[#0255BF] pb-4">
                        <h3
                            className={`font-inter font-semibold text-[20px] leading-[27px] tracking-[0] mb-4 ${s.id === step ? "text-[#FF5D21]" : "text-[#FF5D21]"} `}
                        >
                            Step {s.id} : <span className="text-black">{s.title}</span>
                        </h3>

                        {/* Render only if active step */}
                        {step === s.id && (
                            <>
                                {s.id === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name - full width */}
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="name"
                                                className="block font-inter font-normal text-[14px] leading-[21px] tracking-[0] text-[#585858] mb-1"
                                            >
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`w-full border ${errors.name ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl`}
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        {/* Father's Name - full width */}
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="fatherName"
                                                className="block font-inter font-normal text-[14px] leading-[21px] tracking-[0] text-[#585858] mb-1"
                                            >
                                                Father's Name
                                            </label>
                                            <input
                                                id="fatherName"
                                                type="text"
                                                name="fatherName"
                                                value={formData.fatherName}
                                                onChange={handleChange}
                                                className={`w-full border ${errors.fatherName ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl`}
                                            />
                                            {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
                                        </div>

                                        {/* Qualification */}
                                        <div>
                                            <label
                                                htmlFor="qualification"
                                                className="block font-inter font-normal text-[14px] leading-[21px] tracking-[0] text-[#585858] mb-1"
                                            >
                                                Highest Qualification
                                            </label>
                                            <input
                                                id="qualification"
                                                type="text"
                                                name="qualification"
                                                value={formData.qualification}
                                                onChange={handleChange}
                                                placeholder="Enter your highest qualification"
                                                className={`w-full border ${errors.qualification ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl`}
                                            />
                                            {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
                                        </div>

                                        {/* College */}
                                        <div>
                                            <label
                                                htmlFor="university"
                                                className="block font-inter font-normal text-[14px] leading-[21px] tracking-[0] text-[#585858] mb-1"
                                            >
                                                College / University
                                            </label>
                                            <input
                                                id="university"
                                                type="text"
                                                name="university"
                                                value={formData.university}
                                                onChange={handleChange}
                                                className={`w-full border ${errors.university ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl`}
                                            />
                                            {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
                                        </div>

                                        {/* Percentage */}
                                        <div>
                                            <label
                                                htmlFor="percentage"
                                                className="block font-inter font-normal text-[14px] leading-[21px] tracking-[0] text-[#585858] mb-1"
                                            >
                                                Percentage
                                            </label>
                                            <input
                                                id="percentage"
                                                type="text"
                                                name="percentage"
                                                value={formData.percentage}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const regex = /^(100(\.0{0,2})?|(\d{1,2}(\.\d{0,2})?))$/;
                                                    if (value === "" || regex.test(value)) {
                                                        handleChange(e);
                                                    }
                                                }}
                                                className={`w-full border ${errors.percentage ? "border-red-500" : "border-[#C5C5C5]"
                                                    } p-3 rounded-2xl`}
                                                placeholder="e.g., 45.25 or 100"
                                            />
                                            {errors.percentage && (
                                                <p className="text-red-500 text-sm mt-1">{errors.percentage}</p>
                                            )}
                                        </div>

                                        {/* Passing Year */}
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="passingYear"
                                                className="mb-1"
                                                style={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 400,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "21px",
                                                    letterSpacing: "0",
                                                    color: "#585858",
                                                }}
                                            >
                                                Year of Passing Out
                                            </label>
                                            <input
                                                id="passingYear"
                                                type="text"
                                                name="passingYear"
                                                value={formData.passingYear}
                                                onChange={(e) => {
                                                    const value = e.target.value;

                                                    // Allow only numbers and max 4 digits
                                                    if (/^\d*$/.test(value) && value.length <= 4) {
                                                        setFormData({ ...formData, passingYear: value });

                                                        // Validate as user types
                                                        if (value.length > 0 && value.length !== 4) {
                                                            setErrors({ ...errors, passingYear: "❌ Please enter a valid 4-digit year" });
                                                        } else {
                                                            setErrors({ ...errors, passingYear: "" });
                                                        }
                                                    }
                                                }}
                                                maxLength={4}
                                                className={`border ${errors.passingYear ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl w-full focus:outline-none focus:ring-2 ${errors.passingYear ? "focus:ring-red-500" : "focus:ring-[#FF5D21]"}`}
                                                required
                                            />
                                            {errors.passingYear && (
                                                <p className="text-red-500 text-sm mt-1">{errors.passingYear}</p>
                                            )}
                                        </div>



                                        {/* Intermediate College */}
                                        <div>
                                            <label
                                                htmlFor="interCollege"
                                                className="block font-inter font-normal text-[14px] leading-[21px] tracking-[0] text-[#585858] mb-1"
                                            >
                                                Intermediate College Name
                                            </label>
                                            <input
                                                id="interCollege"
                                                type="text"
                                                name="interCollege"
                                                value={formData.interCollege}
                                                onChange={handleChange}
                                                className={`w-full border ${errors.interCollege ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl`}
                                            />
                                            {errors.interCollege && <p className="text-red-500 text-sm mt-1">{errors.interCollege}</p>}
                                        </div>

                                        {/* Intermediate Percentage */}
                                        <div>
                                            <label
                                                htmlFor="interPercentage"
                                                className="block font-inter font-normal text-[14px] leading-[21px] tracking-[0] text-[#585858] mb-1"
                                            >
                                                Intermediate Percentage
                                            </label>
                                            <input
                                                id="interPercentage"
                                                type="text"
                                                name="interPercentage"
                                                value={formData.interPercentage}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const regex = /^(100(\.0{0,2})?|(\d{1,2}(\.\d{0,2})?))$/;
                                                    if (value === "" || regex.test(value)) {
                                                        handleChange(e);
                                                    }
                                                }}
                                                className={`w-full border ${errors.interPercentage ? "border-red-500" : "border-[#C5C5C5]"
                                                    } p-3 rounded-2xl`}
                                                placeholder="e.g., 87.25 or 100"
                                            />
                                            {errors.interPercentage && (
                                                <p className="text-red-500 text-sm mt-1">{errors.interPercentage}</p>
                                            )}
                                        </div>

                                        {/* School Name */}
                                        <div>
                                            <label
                                                htmlFor="schoolName"
                                                className="block font-inter font-normal text-[14px] leading-[21px] tracking-[0] text-[#585858] mb-1"
                                            >
                                                10th Class School Name
                                            </label>
                                            <input
                                                id="schoolName"
                                                type="text"
                                                name="schoolName"
                                                value={formData.schoolName}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const regex = /^[a-zA-Z0-9 .&-]{0,100}$/;
                                                    if (regex.test(value)) {
                                                        handleChange(e);
                                                    }
                                                }}
                                                className={`w-full border ${errors.schoolName ? "border-red-500" : "border-[#C5C5C5]"
                                                    } p-3 rounded-2xl`}
                                                placeholder="e.g., ABC High School"
                                            />
                                            {errors.schoolName && (
                                                <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Location Details */}
                                {s.id === 2 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Current Location */}
                                        <div>
                                            <label
                                                htmlFor="currentLocation"
                                                className="block font-inter font-normal text-[14px] leading-[21px] text-[#585858] mb-1"
                                            >
                                                Current Residence
                                            </label>
                                            <input
                                                id="currentLocation"
                                                type="text"
                                                name="currentLocation"
                                                value={formData.currentLocation}
                                                onChange={handleChange}
                                                placeholder="Enter your location"
                                                className={`w-full border ${errors.currentLocation ? "border-red-500" : "border-[#C5C5C5]"
                                                    } p-3 rounded-2xl`}
                                                style={{ background: "#87878733" }}
                                            />
                                            {errors.currentLocation && (
                                                <p className="text-red-500 text-sm mt-1">{errors.currentLocation}</p>
                                            )}
                                        </div>

                                        {/* Preferred Location */}
                                        <div>
                                            <label
                                                htmlFor="preferredLocation"
                                                className="block font-inter font-normal text-[14px] leading-[21px] text-[#585858] mb-1"
                                            >
                                                Preferred Location
                                            </label>
                                            <input
                                                id="preferredLocation"
                                                type="text"
                                                name="preferredLocation"
                                                value={formData.preferredLocation}
                                                onChange={handleChange}
                                                className={`w-full border ${errors.preferredLocation ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl`}
                                            />
                                            {errors.preferredLocation && <p className="text-red-500 text-sm mt-1">{errors.preferredLocation}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Tutoring Profile */}
                                {s.id === 3 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="classesHandled"
                                                className="mb-1"
                                                style={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 400,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "21px",
                                                    letterSpacing: "0",
                                                    color: "#585858",
                                                }}
                                            >
                                                Classes You Can Handle (Upto which grade)
                                            </label>
                                            <select
                                                id="classesHandled"
                                                name="classesHandled"
                                                value={formData.classesHandled}
                                                onChange={handleChange}
                                                className={`border ${errors.classesHandled ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl w-full`}
                                            >
                                                <option value="">Select Class</option>
                                                <option value="Nursery">Nursery</option>
                                                <option value="LKG">LKG</option>
                                                <option value="UKG">UKG</option>
                                                {[...Array(12)].map((_, i) => (
                                                    <option key={i + 1} value={`Class ${i + 1}`}>
                                                        Class {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.classesHandled && <p className="text-red-500 text-sm mt-1">{errors.classesHandled}</p>}
                                        </div>

                                        <div className="relative w-full" ref={subjectsDropdownRef}>
                                            <label className="mb-1 block text-[#585858] font-inter text-[14px]">
                                                Subjects You Are Confident In
                                            </label>

                                            <div
                                                className="border rounded-2xl p-3 flex justify-between items-center cursor-pointer"
                                                onClick={() => setSubjectsDropdownOpen(!subjectsDropdownOpen)}
                                            >
                                                <span className="text-[#434242]">
                                                    {formData.subjectsTaught.length > 0
                                                        ? formData.subjectsTaught.join(", ")
                                                        : "Select Subjects"}
                                                </span>
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            </div>

                                            {subjectsDropdownOpen && (
                                                <div className="absolute mt-1 w-full max-h-60 overflow-y-auto border rounded-lg bg-white z-50 shadow-lg p-2">
                                                    {subjectOptions.map((subject) => (
                                                        <label key={subject} className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.subjectsTaught.includes(subject)}
                                                                onChange={(e) => {
                                                                    const newSubjects = e.target.checked
                                                                        ? [...formData.subjectsTaught, subject]
                                                                        : formData.subjectsTaught.filter((s) => s !== subject);
                                                                    setFormData({ ...formData, subjectsTaught: newSubjects });
                                                                }}
                                                            />
                                                            <span className="text-[#434242]">{subject}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {errors.subjectsTaught && (
                                                <p className="text-red-500 text-sm mt-1">{errors.subjectsTaught}</p>
                                            )}
                                        </div>



                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="previousTutoringExperience"
                                                className="mb-1"
                                                style={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 400,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "21px",
                                                    letterSpacing: "0",
                                                    color: "#585858",
                                                }}
                                            >
                                                Previous Tutoring Experience
                                            </label>
                                           <input
  id="previousTutoringExperience"
  type="number"
  name="previousTutoringExperience"
  value={formData.previousTutoringExperience}
  onChange={(e) => {
    // limit values to two digits (0-99)
    const val = e.target.value;
    if (val === "" || (/^\d{1,2}$/.test(val) && Number(val) <= 99)) {
      handleChange(e);
    }
  }}
  min={0}
  max={99}
  className={`border ${errors.previousTutoringExperience ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl w-full`}
  placeholder="Enter number of years, e.g., 3"
/>

                                            {errors.previousTutoringExperience && (
                                                <p className="text-red-500 text-sm mt-1">{errors.previousTutoringExperience}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="classesTaught"
                                                className="mb-1"
                                                style={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 400,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "21px",
                                                    letterSpacing: "0",
                                                    color: "#585858",
                                                }}
                                            >
                                                Classes You Have Previously Taught
                                            </label>
                                            <input
                                                id="classesTaught"
                                                type="text"
                                                name="classesTaught"
                                                value={formData.classesTaught}
                                                onChange={handleChange}
                                                className={`border ${errors.classesTaught ? "border-red-500" : "border-[#C5C5C5]"
                                                    } p-3 rounded-2xl w-full`}
                                                placeholder="e.g., Class 4th, Class 6th"
                                            />
                                            {errors.classesTaught && (
                                                <p className="text-red-500 text-sm mt-1">{errors.classesTaught}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Contact Information */}
                                {s.id === 4 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="phone"
                                                className="mb-1"
                                                style={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 400,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "21px",
                                                    letterSpacing: "0",
                                                    color: "#585858",
                                                }}
                                            >
                                                Whatsapp Number
                                            </label>
                                            <input
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const value = e.target.value;

                                                    // Allow only numbers
                                                    if (/^\d*$/.test(value)) {
                                                        setFormData({ ...formData, phone: value });

                                                        // Validate as user types
                                                        if (value.length > 0 && value.length !== 10) {
                                                            setErrors({ ...errors, phone: "❌ Please enter a valid 10-digit number" });
                                                        } else {
                                                            setErrors({ ...errors, phone: "" });
                                                        }
                                                    }
                                                }}
                                                maxLength={10}
                                                className={`border ${errors.phone ? "border-red-500" : "border-[#C5C5C5]"
                                                    } p-3 rounded-2xl w-full focus:outline-none focus:ring-2 ${errors.phone ? "focus:ring-red-500" : "focus:ring-[#FF5D21]"
                                                    }`}
                                                required
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                            )}
                                        </div>


                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="altPhone"
                                                className="mb-1"
                                                style={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 400,
                                                    fontStyle: "normal",
                                                    fontSize: "14px",
                                                    lineHeight: "21px",
                                                    letterSpacing: "0",
                                                    color: "#585858",
                                                }}
                                            >
                                                Alternative Phone Number
                                            </label>
                                            <input
                                                id="altPhone"
                                                type="text"
                                                name="altPhone"
                                                value={formData.altPhone}
                                                onChange={(e) => {
                                                    const value = e.target.value;

                                                    // Allow only numbers
                                                    if (/^\d*$/.test(value)) {
                                                        setFormData({ ...formData, altPhone: value });

                                                        // Validate as user types
                                                        if (value.length > 0 && value.length !== 10) {
                                                            setErrors({ ...errors, altPhone: "❌ Please enter a valid 10-digit number" });
                                                        } else {
                                                            setErrors({ ...errors, altPhone: "" });
                                                        }
                                                    }
                                                }}
                                                maxLength={10}
                                                className={`border ${errors.altPhone ? "border-red-500" : "border-[#C5C5C5]"
                                                    } p-3 rounded-2xl w-full focus:outline-none focus:ring-2 ${errors.altPhone ? "focus:ring-red-500" : "focus:ring-[#FF5D21]"
                                                    }`}
                                                required
                                            />
                                            {errors.altPhone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.altPhone}</p>
                                            )}
                                        </div>

                                    </div>
                                )}

                                {/* Step 5: Additional Information */}
                                {s.id === 5 && (
                                    <div className="flex flex-col gap-4">
                                        {/* Bike Availability */}
                                        <div className="flex flex-col">
                                            <label className="mb-1 text-[#585858] text-sm font-normal">Do you have a bike?</label>
                                            <select
                                                name="hasBike"
                                                value={formData.hasBike || ""}
                                                onChange={handleChange}
                                                className={`border ${errors.hasBike ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl w-full`}
                                            >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                            {errors.hasBike && <p className="text-red-500 text-sm mt-1">{errors.hasBike}</p>}
                                        </div>

                                        {/* Syllabus */}
                                        <div className="flex flex-col">
                                            <label className="mb-1 text-[#585858] text-sm font-normal">Your Schooling Syllabus</label>
                                            <select
                                                name="syllabus"
                                                value={formData.syllabus || ""}
                                                onChange={handleChange}
                                                className={`border ${errors.syllabus ? "border-red-500" : "border-[#C5C5C5]"} p-3 rounded-2xl w-full`}
                                            >
                                                <option value="">Select</option>
                                                <option value="CBSE">CBSE</option>
                                                <option value="ICSE">ICSE</option>
                                                <option value="IGSCE">IGSCE</option>
                                                <option value="IB">IB</option>
                                                <option value="CAMBRIDGE">CAMBRIDGE</option>
                                                <option value="STATE">STATE</option>
                                                <option value="IIT">IIT</option>
                                                <option value="OLYMPIAD">OLYMPIAD</option>
                                                <option value="Other">OTHER</option>
                                            </select>
                                            {errors.syllabus && <p className="text-red-500 text-sm mt-1">{errors.syllabus}</p>}
                                        </div>

                                        {/* Languages + Proficiency */}
                                      <div className="flex flex-col gap-2">
    <label className="mb-1 text-[#585858] text-sm font-normal">Languages Known</label>
    {formData.languages.map((lang, index) => (
        <div key={index} className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
                <div className="flex flex-col w-full">
                    <input
                        type="text"
                        placeholder="Language"
                        value={lang.language || ""}
                        onChange={(e) => handleLanguageChange(index, "language", e.target.value)}
                        className="border border-[#C5C5C5] p-3 rounded-2xl w-full"
                    />
                    {errors[`language_${index}`] && (
                        <p className="text-red-500 text-sm">{errors[`language_${index}`]}</p>
                    )}
                </div>

                <div className="flex flex-col w-32">
                    <select
                        value={lang.proficiency || ""}
                        onChange={(e) => handleLanguageChange(index, "proficiency", e.target.value)}
                        className="border border-[#C5C5C5] p-3 rounded-2xl w-full"
                    >
                        <option value="">Proficiency</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors[`proficiency_${index}`] && (
                        <p className="text-red-500 text-sm">{errors[`proficiency_${index}`]}</p>
                    )}
                </div>

                {formData.languages.length > 1 && (
                    <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="text-red-500 font-bold"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    ))}

    <button
        type="button"
        onClick={addLanguage}
        className="mt-2 text-blue-600 font-medium"
    >
        + Add Language
    </button>

    {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
</div>

                                    </div>
                                )}



                                {/* Step 6: Upload Documents */}
                                {s.id === 6 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Upload Photograph */}
                                        <div>
                                            <label className="flex flex-col items-center justify-center border rounded-xl p-6 cursor-pointer hover:shadow-md transition">
                                                <div className="flex flex-col items-center gap-3">
                                                    {/* Icon */}
                                                    <div className="text-orange-400">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-12 h-12"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M3 8.25V6A2.25 2.25 0 015.25 3.75h13.5A2.25 2.25 0 0121 6v2.25M3 12h18"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span className="border rounded-full px-4 py-1 text-sm text-gray-600 flex items-center gap-1">
                                                        Upload Latest Photograph <span className="text-orange-500 font-bold">+</span>
                                                    </span>

                                                    {/* Show square preview & file name for Photo */}
                                                    {formData.photo && (
                                                        <div className="mt-2 text-center">
                                                            <img
                                                                src={URL.createObjectURL(formData.photo)}
                                                                alt="Preview"
                                                                className="w-20 h-20 object-cover rounded-md mx-auto mb-1"
                                                            />
                                                            <p className="text-xs text-green-600">{formData.photo.name}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"

                                                    name="photo"
                                                    accept="image/*"
                                                    onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                                                    className="hidden"
                                                />
                                            </label>
                                            {errors.photo && (
                                                <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
                                            )}
                                        </div>

                                        {/* Upload Aadhaar */}
                                        <div>
                                            <label className="flex flex-col items-center justify-center border rounded-xl p-6 cursor-pointer hover:shadow-md transition">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="text-orange-400">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-12 h-12"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0v.75H4.5v-.75z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span className="border rounded-full px-4 py-1 text-sm text-gray-600 flex items-center gap-1">
                                                        Upload Aadhaar Identity <span className="text-orange-500 font-bold">+</span>
                                                    </span>

                                                    {/* Show preview if image, file name if PDF */}
                                                    {formData.aadhar && (
                                                        <div className="mt-2 text-center">
                                                            {formData.aadhar.type.startsWith("image/") ? (
                                                                <>
                                                                    <img
                                                                        src={URL.createObjectURL(formData.aadhar)}
                                                                        alt="Aadhaar Preview"
                                                                        className="w-20 h-20 object-cover rounded-md mx-auto mb-1"
                                                                    />
                                                                    <p className="text-xs text-green-600">{formData.aadhar.name}</p>
                                                                </>
                                                            ) : (
                                                                <p className="text-xs text-green-600">{formData.aadhar.name}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    name="aadhar"
                                                    accept="image/*,application/pdf"
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, aadhar: e.target.files[0] })
                                                    }
                                                    className="hidden"
                                                />
                                            </label>
                                            {errors.aadhar && (
                                                <p className="text-red-500 text-sm mt-1">{errors.aadhar}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-between mt-8 gap-3">
                                    {/* Back Button */}
                                    {s.id > 1 && (
                                        <button
                                            onClick={handlePrev}
                                            className="bg-gray-400 text-white px-6 sm:px-10 py-2 sm:py-1 rounded-2xl w-full sm:w-auto"
                                            style={{
                                                fontFamily: "Inter",
                                                fontWeight: 500,
                                                fontStyle: "normal",
                                                fontSize: "14px",
                                                lineHeight: "21px",
                                                letterSpacing: "0",
                                            }}
                                        >
                                            Back
                                        </button>
                                    )}

                                    {/* Next / Submit Button */}
                                    {s.id < 6 ? (
                                        <button
                                            onClick={handleNext}
                                            className="bg-[#FF5D21] hover:bg-orange-600 text-white px-6 sm:px-14 py-2 sm:py-3 rounded-2xl font-semibold w-full sm:w-auto sm:ml-auto"
                                        >
                                            Save and Continue
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className="bg-[#FF5D21] hover:bg-orange-600 px-6 sm:px-14 py-2 sm:py-3 rounded-2xl w-full sm:w-auto sm:ml-auto"
                                            style={{
                                                fontFamily: "Inter",
                                                fontWeight: 500,
                                                fontStyle: "normal",
                                                fontSize: "14px",
                                                lineHeight: "21px",
                                                letterSpacing: "0",
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            Submit Application Form
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorRegistration;