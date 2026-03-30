import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaTrash, FaPlus } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { ChevronDown } from "lucide-react";
import api from "../api/axiosConfig"
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Demo = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [emailError, setEmailError] = useState("");
    const [contactError, setContactError] = useState("");
    const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownRefs = useRef([]);
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



    // Initial form state
    const initialFormData = {
        contactNumber: "",
        email: "",
        tutorGender: "",
        preferredTime: "",
        preferredTimingByParent: "",
        frequency: "",
        location: "",
        children: [
            {
                childName: "",
                grade: "",
                board: "",
                subjects: []
            }
        ]
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedLocation, setSelectedLocation] = useState(null);



    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRefs.current.every(
                    (ref) => ref && !ref.contains(event.target)
                )
            ) {
                setOpenIndex(null); // close all if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const validateContact = (value) => {
        const regex = /^[0-9]{10}$/;
        if (!regex.test(value)) {
            setContactError("❌ Please enter a valid 10-digit phone number");
        } else {
            setContactError("");
        }
    };

    const validateEmail = (value) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(value)) {
            setEmailError("❌ Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handleInputChange = (e, childIndex = null) => {
        const { name, value } = e.target;

        if (childIndex !== null) {
            // Update child field
            const updatedChildren = [...formData.children];
            updatedChildren[childIndex][name] = value;
            setFormData({ ...formData, children: updatedChildren });
        } else {
            // Update parent field
            if (name === "contactNumber") {
                if (/^\d{0,10}$/.test(value)) {
                    setFormData({ ...formData, [name]: value });
                }
            } else {
                setFormData({ ...formData, [name]: value });
            }
        }
    };

    const handleCheckboxChange = (subject, childIndex) => {
        const updatedChildren = [...formData.children];
        let updatedSubjects = [...updatedChildren[childIndex].subjects];

        if (updatedSubjects.includes(subject)) {
            updatedSubjects = updatedSubjects.filter((s) => s !== subject);
        } else {
            updatedSubjects.push(subject);
        }

        updatedChildren[childIndex].subjects = updatedSubjects;
        setFormData({ ...formData, children: updatedChildren });
    };

    const addChild = () => {
        setFormData({
            ...formData,
            children: [
                ...formData.children,
                {
                    childName: "",
                    grade: "",
                    board: "",
                    subjects: []
                }
            ]
        });
    };



    const removeChild = (index) => {
        if (formData.children.length > 1) {
            const updatedChildren = [...formData.children];
            updatedChildren.splice(index, 1);
            setFormData({ ...formData, children: updatedChildren });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");

        let newErrors = {};

        // ✅ Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // ✅ Contact number validation
        if (!formData.contactNumber) {
            newErrors.contactNumber = "Contact number is required";
        } else if (!/^\d{10}$/.test(formData.contactNumber)) {
            newErrors.contactNumber = "Please enter a valid 10-digit mobile number";
        }

        // ✅ Validate children
        formData.children.forEach((child, index) => {
            if (!child.childName) {
                newErrors[`childName-${index}`] = "Child name is required";
            }
            if (!child.grade) {
                newErrors[`grade-${index}`] = "Grade is required";
            }
            if (!child.board) {
                newErrors[`board-${index}`] = "Board is required";
            }
            if (child.subjects.length === 0) {
                newErrors[`subjects-${index}`] = "At least one subject is required";
            }
        });

        // ✅ Stop if validation errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);

            // Focus first invalid field
            const firstErrorField = Object.keys(newErrors)[0];
            const inputEl = document.querySelector(
                `[name='${firstErrorField.split("-")[0]}']`
            );
            if (inputEl) inputEl.focus();

            return;
        }

        setErrors({}); // Clear errors

        try {
            // ✅ Use Axios common API
            const response = await api.post("/api/bookings", formData);

            if (response.status === 200 || response.status === 201) {
                setSubmitMessage("✅ Enquiry submitted successfully! We will contact you shortly.");
                setFormData(initialFormData); // Reset form
                setSelectedLocation(null);
            } else {
                setSubmitMessage("❌ Failed to submit booking. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
            setSubmitMessage("⚠️ An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };


    const subjectsList = [
        "All Subject", "Maths & Science", "Maths", "Physics", "Chemistry",
        "Biology", "English", "Hindi", "Telgu", "Accountancy", "Civics", "Commerce"
    ];

    const locations = [
        "Abids", "Afzalgunj", "Amberpet", "Ashok Nagar", "Attapur",
        "Bahadurpura", "Barkatpura", "Basheerbagh", "Basheer Bagh", "Begum Bazaar",
        "Chaderghat", "Chanchalguda", "Charminar", "Chandrayangutta", "Dabirpura",
        "Darulshifa", "Dilsukhnagar", "Dhoolpet", "Falaknuma", "Gaddiannaram",
        "Gaddiannaram Fruit Market belt", "Himayatnagar", "Himayat Nagar", "Kachiguda",
        "Karwan", "Koti", "Kukatpally", "Lakdikapul", "Langar Houz", "Mallepally",
        "New Mallepally", "Malakpet", "Malakpet Gunj", "Mehdipatnam", "Moghalpura",
        "Moosarambagh", "Mozamjahi Market", "Musheerabad", "Nampally", "Nayapul",
        "Osmangunj", "Purani Haveli", "Red Hills", "RTC X Roads", "Saidabad",
        "Santosh Nagar", "Shah Ali Banda", "Shivrampally", "Sultan Bazaar", "Yakutpura",
        "Yousufguda", "Ambernagar", "Anandbagh", "Balkampet", "Bharat Nagar",
        "A S Rao Nagar", "Alwal", "Alwal (posh pockets only)", "Ammuguda", "Bowenpally",
        "Old Bowenpally", "Bolarum", "Defence Colony", "ECIL", "Jeedimetla", "Karkhana",
        "Kharkana", "Lalaguda", "Lothkunta", "Malkajgiri", "Marredpally (East & West)",
        "Marredpally (Secunderabad)", "Moula Ali", "Nacharam", "Neredmet", "Picket",
        "Ranigunj", "Safilguda", "Sainikpuri", "Sainikpuri (Secunderabad)",
        "Secunderabad (General Bazaar, Station Road)", "Sindhi Colony (Secunderabad)",
        "Sitaphalmandi", "Seethafalmandi", "Sitaphalmandi Railway Colony", "Tarnaka",
        "Tarnaka X Roads", "Trimulgherry", "Yapral", "Chilkalguda", "Chilkalguda Market area",
        "Padmarao Nagar", "Ramgopalpet", "Domalguda", "Adibatla", "Appa Junction",
        "Bachupally", "Bandlaguda Jagir", "Beeramguda", "Bowrampet", "Chintalmet",
        "Dundigal", "Gandipet", "Hafeezpet", "Hayathnagar", "Ibrahimpatnam (GHMC belt)",
        "Janwada", "Jawaharnagar", "Kismatpur", "Kollur", "Mallampet", "Medchal",
        "Moosapet", "Neknampur", "Patancheru (Metro side)", "Pragathi Nagar", "Puppalaguda",
        "Rajendranagar", "Raidurgam", "Rampally", "Shankarpally", "Shamshabad", "Thumkunta",
        "Uppal", "Vanasthalipuram", "Gajularamaram", "Qutbullapur", "Jagadgirigutta",
        "Miyapur X Roads (non-prime side)", "Erragadda", "Esamia Bazaar", "Fateh Nagar",
        "Gagan Mahal", "Gandhi Nagar", "Hakimpet (Cantonment side)", "Hyderguda", "Kattedan",
        "Lakshminagar Colony", "Madhura Nagar", "Madannapet", "Maruthi Nagar", "Sanathnagar",
        "Azamabad", "Kishanbagh", "Jambagh", "Vidyanagar", "Warsiguda", "Saroornagar",
        "Kothapet", "Nagole", "LB Nagar (non-prime side)", "Hastinapuram", "Meerpet",
        "Badangpet", "Bairamalguda", "Mansoorabad", "Banjara Hills", "Jubilee Hills",
        "Jubilee Hills Road No. 45 area (VIP stretch)", "HITEC City", "Gachibowli",
        "Financial District (Nanakramguda)", "Manikonda", "Kokapet", "Narsingi", "Tellapur",
        "Nallagandla", "Chandanagar", "Lingampally", "Kondapur", "Madhapur", "Srinagar Colony",
        "Begumpet", "Somajiguda", "Miyapur", "Mokila", "Pocharam (IT SEZ belt)", "Shaikpet",
        "Tolichowki (posh gated communities)", "Film Nagar", "Suchitra", "Other"
    ];

    const faqs = [
        {
            question: "Why should I choose Vivekaananda Home Tuitions over others",
            answer: `We are not just a tuition service — we are a goal-oriented academy built on the philosophy of “Knowledge with Values.” Every tutor is carefully chosen for their expertise, professionalism, and ability to inspire students, ensuring long-term results.`,
        },
        {
            question: " Will my child get personal attention from the tutor?",
            answer: "Yes. Every child learns at their own pace. That’s why we provide one-to-one personalized home tutoring, where the tutor focuses entirely on your child’s strengths, weaknesses, and progress.",
        },
        {
            question: "How quickly can a tutor be arranged for my child?",
            answer: "In most cases, we assign a suitable tutor within 24–48 hours of receiving your request, based on your child’s grade, subjects, and location.",
        },
        {
            question: "How do I know if the tutor is reliable and safe?",
            answer: `Your child’s safety is our top priority. All tutors undergo:
	•	Background verification
	•	Qualification checks
	•	Personal interviews
This ensures you get trustworthy and professional educators at your doorstep.`,
        },
        {
            question: "What makes your tutors different from regular coaching centers?",
            answer: `Unlike crowded coaching classes, our tutors provide undivided personal attention in the comfort of your home. They act not just as teachers but also as mentors, guiding students in academics, discipline, and confidence-building.`,
        },
        {
            question: " Can I change the tutor if I am not satisfied?",
            answer: `Absolutely. If for any reason you are not satisfied, we will arrange a replacement tutor quickly at no extra cost, ensuring a smooth learning experience.`,
        },
        {
            question: "Do you provide exam-focused preparation?",
            answer: "Yes. Along with regular subject teaching, we provide special coaching for board exams, Olympiads, and competitive entrance exams like IIT-JEE, NEET, and EAMCET.",
        },
        {
            question: "How do you maintain quality consistently?",
            answer: "We have a dedicated support team that regularly follows up with parents, tracks student progress, and ensures that every tutor maintains our academy’s high standards.",
        },
    ];


    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white text-gray-800 font-inter">
            <Navbar />
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
                style={{ backgroundImage: "url('/Images/Demo/demo.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        Book Your Free Trial Class Today
                    </h1>
                    <p className="text-md font-semibold text-[#FFFFFF]">
                        Experience our teaching style before you commit
                    </p>
                </div>
            </section>

            <section className="py-12 px-6 bg-[#FFFFFF] flex justify-center">
                <div className="max-w-4xl w-full flex flex-col md:flex-row items-start md:items-center justify-center gap-6">
                    {/* Why Book a Trial Class? */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-[18px] md:text-[22px] text-[#1E1E1E] leading-[28px] md:leading-[32px] font-semibold mb-4 text-center md:text-left">
                            Why Book a Trial Class?
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-[#FE6E01] w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
                                <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] font-medium">
                                    Meet your tutor before committing
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-[#FE6E01] w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
                                <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] font-medium">
                                    Personalized session based on your needs
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-[#FE6E01] w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
                                <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] font-medium">
                                    Understand our teaching approach
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* How it Works? */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-[18px] md:text-[22px] text-[#1E1E1E] leading-[28px] md:leading-[32px] font-semibold mb-4 text-center md:text-left">
                            How it Works?
                        </h3>
                        <ol className="space-y-2">
                            <li className="flex items-center gap-2 leading-[21px] md:leading-[24px] font-medium">
                                <span className="flex items-center justify-center bg-[#FE6E01] text-white w-[20px] h-[20px] md:w-[22px] md:h-[22px] rounded-full text-xs">
                                    1
                                </span>
                                <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] font-medium">
                                    Fill the form – Share your requirements
                                </span>
                            </li>
                            <li className="flex items-center gap-2 leading-[21px] md:leading-[24px] font-medium">
                                <span className="flex items-center justify-center bg-[#FE6E01] text-white w-[20px] h-[20px] md:w-[22px] md:h-[22px] rounded-full text-xs">
                                    2
                                </span>
                                <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] font-medium">
                                    We call you – Confirm tutor availability & schedule
                                </span>
                            </li>
                            <li className="flex items-start md:items-center gap-2 font-medium">
                                <span className="flex items-center justify-center bg-[#FE6E01] text-white w-[20px] h-[20px] md:w-[22px] md:h-[22px] rounded-full text-xs shrink-0">
                                    3
                                </span>
                                <span className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] font-medium">
                                    Attend the session – Experience learning, decide later
                                </span>
                            </li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Quick Booking Form */}
            <section id="book-demo-section" className="py-8 px-4 flex justify-center items-center">
                <div className="w-full max-w-4xl">
                    <h2 className="text-[30px] leading-[36px] font-semibold text-[#000000] mb-6 text-center">
                        Quick Enquiry Form
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* Parent Details Section */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <h3 className="text-xl font-semibold mb-4 text-[#FE6E01]">Parent Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* Contact Number */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-[#373737] mb-1 font-inter">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            validateContact(e.target.value); // 👈 validate live while typing
                                        }}
                                        className={`border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 ${contactError
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-[#FF5D21]"
                                            }`}
                                        required
                                    />
                                    {contactError && (
                                        <span className="text-red-500 text-xs mt-1">{contactError}</span>
                                    )}
                                    {errors.contactNumber && (
                                        <span className="text-red-500 text-xs mt-1">{errors.contactNumber}</span>
                                    )}
                                </div>


                                {/* Email */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-[#373737] mb-1 font-inter">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onBlur={(e) => validateEmail(e.target.value)}
                                        className={`border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 ${emailError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#FF5D21]"}`}
                                        required
                                    />
                                    {emailError && (
                                        <span className="text-red-500 text-xs mt-1">{emailError}</span>
                                    )}
                                    {errors.email && (
                                        <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                                    )}
                                </div>

                                {/* Preferred Tutor Gender */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-[#373737] mb-1 font-inter">
                                        Preferred Tutor Gender
                                    </label>
                                    <select
                                        name="tutorGender"
                                        value={formData.tutorGender}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FF5D21]"
                                        required
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male/Female">Male/Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                {/* Preferred Time */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-[#373737] mb-1 font-inter">
                                        Preferred Time for Classes
                                    </label>
                                    <select
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FF5D21]"
                                        required
                                    >
                                        <option value="">Select time</option>
                                        <option value="1 HRS">1 HRS</option>
                                        <option value="2 HRS">2 HRS</option>
                                        <option value="90 MIN/DAY">90 MIN/DAY</option>
                                    </select>
                                </div>

                                {/* Number of Classes */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-[#373737] mb-1 font-inter">
                                        Number of Classes per week
                                    </label>
                                    <select
                                        name="frequency"
                                        value={formData.frequency}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FF5D21]"
                                        required
                                    >
                                        <option value="">Select frequency</option>
                                        <option value="1 Days / Week">1 Days / Week</option>
                                        <option value="2 Days / Week">2 Days / Week</option>
                                        <option value="3 Days / Week">3 Days / Week</option>
                                        <option value="4 Days / Week">4 Days / Week</option>
                                        <option value="5 Days / Week">5 Days / Week</option>
                                        <option value="6 Days / Week">6 Days / Week</option>
                                    </select>
                                </div>

                                {/* Location */}
                                <div className="flex flex-col">
                                    <label className="text-sm text-[#373737] mb-1 font-inter">
                                        Location
                                    </label>
                                    <Select
                                        options={locations.map((loc) => ({ value: loc, label: loc }))}
                                        value={selectedLocation}
                                        onChange={(selected) => {
                                            setSelectedLocation(selected);
                                            setFormData({ ...formData, location: selected.value });
                                        }}
                                        placeholder="Select location"
                                        isSearchable
                                    />
                                </div>

                                {/* Parent's Preferred Timing */}
                                <div className="flex flex-col md:col-span-2">
                                    <label className="text-sm text-[#373737] mb-1 font-inter">
                                        Parent's Preferred Timing
                                    </label>
                                    <input
                                        type="text"
                                        name="preferredTimingByParent"
                                        value={formData.preferredTimingByParent}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Morning 7–9 AM / Evening 5–7 PM"
                                        className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FF5D21]"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Children Details Section */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-[#FE6E01]">Children Details</h3>
                                <button
                                    type="button"
                                    onClick={addChild}
                                    className="flex items-center justify-center gap-2 bg-[#FE6E01] text-white py-2 px-4 rounded-lg hover:bg-[#e65a00] transition-colors w-full sm:w-auto"
                                >
                                    <FaPlus className="text-sm sm:text-base" />
                                    <span className="text-sm sm:text-base">Add Another Child</span>
                                </button>

                            </div>

                            {formData.children.map((child, index) => (
                                <div key={index} className=" p-4 border border-gray-200 rounded-lg bg-white">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-medium">Child {index + 1}</h4>
                                        {formData.children.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeChild(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Child's Name */}
                                        <div className="flex flex-col">
                                            <label className="text-sm text-[#373737] mb-1 font-inter">
                                                Child's Name
                                            </label>
                                            <input
                                                type="text"
                                                name="childName"
                                                value={child.childName}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className={`border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FF5D21] ${errors[`childName-${index}`] ? 'border-red-500' : ''}`}
                                                required
                                            />
                                            {errors[`childName-${index}`] && (
                                                <span className="text-red-500 text-xs mt-1">{errors[`childName-${index}`]}</span>
                                            )}
                                        </div>

                                        {/* Class/Grade */}
                                        <div className="flex flex-col">
                                            <label className="text-sm text-[#373737] mb-1 font-inter">
                                                Class/Grade
                                            </label>
                                            <select
                                                name="grade"
                                                value={child.grade}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className={`border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FF5D21] ${errors[`grade-${index}`] ? 'border-red-500' : ''}`}
                                                required
                                            >
                                                <option value="">Select class</option>
                                                <option value="Nursery">Nursery</option>
                                                <option value="LKG">LKG</option>
                                                <option value="UKG">UKG</option>
                                                <option value="1st">1st</option>
                                                <option value="2nd">2nd</option>
                                                <option value="3rd">3rd</option>
                                                <option value="4th">4th</option>
                                                <option value="5th">5th</option>
                                                <option value="6th">6th</option>
                                                <option value="7th">7th</option>
                                                <option value="8th">8th</option>
                                                <option value="9th">9th</option>
                                                <option value="10th">10th</option>
                                                <option value="11th">11th</option>
                                                <option value="12th">12th</option>
                                            </select>
                                            {errors[`grade-${index}`] && (
                                                <span className="text-red-500 text-xs mt-1">{errors[`grade-${index}`]}</span>
                                            )}
                                        </div>

                                        {/* Board/Syllabus */}
                                        <div className="flex flex-col">
                                            <label className="text-sm text-[#373737] mb-1 font-inter">
                                                Board/Syllabus
                                            </label>
                                            <select
                                                name="board"
                                                value={child.board}
                                                onChange={(e) => handleInputChange(e, index)}
                                                className={`border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FF5D21] ${errors[`board-${index}`] ? 'border-red-500' : ''}`}
                                                required
                                            >
                                                <option value="">Select board</option>
                                                <option value="CBSE">CBSE</option>
                                                <option value="ICSE">ICSE</option>
                                                <option value="State">IGSCE</option>
                                                <option value="IGCSE">IB</option>
                                                <option value="CAMBRIDGE">CAMBRIDGE</option>
                                                <option value="STATE">STATE</option>
                                                <option value="IIT">IIT</option>
                                                <option value="OLAMPIAD">OLAMPIAD</option>
                                            </select>
                                            {errors[`board-${index}`] && (
                                                <span className="text-red-500 text-xs mt-1">{errors[`board-${index}`]}</span>
                                            )}
                                        </div>

                                        {/* Preferred Subjects */}
                                        <div
                                            className="flex flex-col relative"
                                            ref={(el) => (dropdownRefs.current[index] = el)} // 👈 store ref for each child
                                        >
                                            <label className="text-sm text-[#373737] mb-1 font-inter">
                                                Preferred Subjects
                                            </label>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenIndex(openIndex === index ? null : index) // toggle only this dropdown
                                                }
                                                className={`border border-gray-300 rounded-xl px-3 py-2 w-full flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#FF5D21] ${errors[`subjects-${index}`] ? "border-red-500" : ""
                                                    }`}
                                            >
                                                {child.subjects.length > 0
                                                    ? child.subjects.join(", ")
                                                    : "Select subjects"}
                                                <ChevronDown size={18} />
                                            </button>

                                            {errors[`subjects-${index}`] && (
                                                <span className="text-red-500 text-xs mt-1">
                                                    {errors[`subjects-${index}`]}
                                                </span>
                                            )}

                                            {openIndex === index && (
                                                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10 p-2">
                                                    {subjectsList.map((subject) => (
                                                        <label
                                                            key={subject}
                                                            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                value={subject}
                                                                checked={child.subjects.includes(subject)}
                                                                onChange={() => handleCheckboxChange(subject, index)}
                                                            />
                                                            {subject}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Status Message */}
                        {submitMessage && (
                            <div className={`text-center mb-4 ${submitMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                                {submitMessage}
                            </div>
                        )}

                        {/* Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#FE6E01] text-white font-medium text-[14px] leading-[21px] py-2.5 px-4 rounded-2xl w-full md:w-[250px] transition-all duration-300 ease-in-out transform hover:bg-[#e64d12] hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Important Details Section */}
            <section className="py-8 px-6 bg-gray-50 flex justify-center">
                <div className="max-w-4xl w-full">
                    <h3 className="text-[24px] leading-[30px] font-medium mb-6">
                        Kindly take a moment to review the following important details:
                    </h3>

                    <ul className="space-y-6">
                        {/* Item 1 */}
                        <li className="flex items-start gap-3">
                            <span className="flex items-center justify-center bg-[#FE6E01] text-white w-[24px] h-[24px] rounded-full flex-shrink-0">
                                ✓
                            </span>
                            <div>
                                <p className="text-[18px] leading-[27px] font-medium">
                                    Demo Class Schedule:
                                </p>
                                <p className="text-[16px] leading-[24px] font-normal">
                                    Your demo class will be arranged within 24 hours from the date of registration.
                                    If we are unable to arrange the demo within 3 working days, your fees will be refunded.
                                </p>
                            </div>
                        </li>

                        {/* Item 2 */}
                        <li className="flex items-start gap-3">
                            <span className="flex items-center justify-center bg-[#FE6E01] text-white w-[24px] h-[24px] rounded-full flex-shrink-0">
                                ✓
                            </span>
                            <div>
                                <p className="text-[18px] leading-[27px] font-medium">
                                    Fee Payment Terms:
                                </p>
                                <p className="text-[16px] leading-[24px] font-normal">
                                    Upon successful completion of the demo session, we kindly request you to make a 50%
                                    advance payment of the agreed tuition fee within 2 days. <br />
                                    The remaining 50% should be settled after completion of one month of classes.
                                    This ensures a smooth and continued learning experience for your child.
                                </p>
                            </div>
                        </li>

                        {/* Item 3 */}
                        <li className="flex items-start gap-3">
                            <span className="flex items-center justify-center bg-[#FE6E01] text-white w-[24px] h-[24px] rounded-full flex-shrink-0">
                                ✓
                            </span>
                            <div>
                                <p className="text-[18px] leading-[27px] font-medium">
                                    Payment Instructions:
                                </p>
                                <p className="text-[16px] leading-[24px] font-normal">
                                    All payments are to be made only to the authorized representatives of Vivekaananda Academy. <br />
                                    We respectfully request you not to make any direct payments to the tutor under any circumstance.
                                </p>
                            </div>
                        </li>

                        {/* Item 4 */}
                        <li className="flex items-start gap-3">
                            <span className="flex items-center justify-center bg-[#FE6E01] text-white w-[24px] h-[24px] rounded-full flex-shrink-0">
                                ✓
                            </span>
                            <div>
                                <p className="text-[18px] leading-[27px] font-medium">
                                    Weekly Feedback:
                                </p>
                                <p className="text-[16px] leading-[24px] font-normal">
                                    To help us maintain the highest standards of service, we request you to share
                                    brief weekly feedback regarding the tutor's performance.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="py-12 px-6 bg-gray-50">
                <h2 className="text-center text-3xl font-semibold text-[#FE6E01] mb-8">
                    What Our Clients Say
                </h2>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    {/* Testimonial Cards */}
                    <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between">
                        <div className="reviewer-info flex items-center mb-4">
                            <div className="avatar w-10 h-10 rounded-full bg-[#99573a] text-white flex items-center justify-center font-bold mr-2">
                                B
                            </div>
                            <div className="reviewer-name font-semibold text-gray-800">
                                Bhagya
                            </div>
                        </div>
                        <div className="review-text text-gray-600 text-sm mb-2">
                            I had an excellent interaction with Vivekananda Home Tuitions, a coaching center. I was pleased to learn that they do not charge any extra fees, which is a great benefit for students and their families. The staff was friendly and helpful, and the atmosphere of the center was welcoming. Overall, my experience with Vivekananda Home Tuitions was positive and I would highly recommend it to others.
                        </div>
                        <div className="review-footer flex items-center justify-between">
                            <div className="stars text-yellow-400">★★★★★</div>
                            <img
                                src="https://images.icon-icons.com/2699/PNG/512/google_logo_icon_169090.png"
                                className="google-logo w-5 ml-2"
                                alt="Google Logo"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between">
                        <div className="reviewer-info flex items-center mb-4">
                            <div className="avatar w-10 h-10 rounded-full bg-[#99573a] text-white flex items-center justify-center font-bold mr-2">
                                S
                            </div>
                            <div className="reviewer-name font-semibold text-gray-800">
                                Shivani Podila
                            </div>
                        </div>
                        <div className="review-text text-gray-600 text-sm mb-2">
                            Vivekananda Home Tuitions is an excellent coaching center that provides top-notch personal attention to its students. The tutors are dedicated and ensure that each student receives individualized support to excel in their studies. I highly recommend Vivekananda Home Tuitions for anyone looking for a nurturing and supportive learning environment.
                        </div>
                        <div className="review-footer flex items-center justify-between">
                            <div className="stars text-yellow-400">★★★★★</div>
                            <img
                                src="https://images.icon-icons.com/2699/PNG/512/google_logo_icon_169090.png"
                                className="google-logo w-5 ml-2"
                                alt="Google Logo"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between">
                        <div className="reviewer-info flex items-center mb-4">
                            <div className="avatar w-10 h-10 rounded-full bg-[#99573a] text-white flex items-center justify-center font-bold mr-2">
                                P
                            </div>
                            <div className="reviewer-name font-semibold text-gray-800">
                                priya
                            </div>
                        </div>
                        <div className="review-text text-gray-600 text-sm mb-2">
                            I had a great experience with Vivekananda Home Tuitions, a fantastic coaching centre. They focus on regular evaluation and give personal attention to each student. The place has sports activities and a nice cafeteria. I felt safe because they have good security and clean, sanitised classrooms. They also offer easy payment options with EMI available and no extra fees, which is helpful. The courses are highly specialised and of great quality. Overall, it was an excellent choice for learning!
                        </div>
                        <div className="review-footer flex items-center justify-between">
                            <div className="stars text-yellow-400">★★★★★</div>
                            <img
                                src="https://images.icon-icons.com/2699/PNG/512/google_logo_icon_169090.png"
                                className="google-logo w-5 ml-2"
                                alt="Google Logo"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between">
                        <div className="reviewer-info flex items-center mb-4">
                            <div className="avatar w-10 h-10 rounded-full bg-[#99573a] text-white flex items-center justify-center font-bold mr-2">
                                S
                            </div>
                            <div className="reviewer-name font-semibold text-gray-800">
                                SRINU
                            </div>
                        </div>
                        <div className="review-text text-gray-600 text-sm mb-2">
                            Vivekananda Home Tuitions behind the bus stop at Bhasyam School, Dilsukhnagar, offers excellent coaching with highly specialized and expert faculty. The centre provides regular evaluation, subject matter expertise, and highly experienced tutors at a reasonable price.
                        </div>
                        <div className="review-footer flex items-center justify-between">
                            <div className="stars text-yellow-400">★★★★★</div>
                            <img
                                src="https://images.icon-icons.com/2699/PNG/512/google_logo_icon_169090.png"
                                className="google-logo w-5 ml-2"
                                alt="Google Logo"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between">
                        <div className="reviewer-info flex items-center mb-4">
                            <div className="avatar w-10 h-10 rounded-full bg-[#99573a] text-white flex items-center justify-center font-bold mr-2">
                                G
                            </div>
                            <div className="reviewer-name font-semibold text-gray-800">
                                GUNDAGANI VINAY

                            </div>
                        </div>
                        <div className="review-text text-gray-600 text-sm mb-2">
                            I am working as a tutor since 2 years,I taught subjects like MATHMATICS, Science to 6 th class student.It is a icse syllabus,near DD colony.                        </div>
                        <div className="review-footer flex items-center justify-between">
                            <div className="stars text-yellow-400">★★★★★</div>
                            <img
                                src="https://images.icon-icons.com/2699/PNG/512/google_logo_icon_169090.png"
                                className="google-logo w-5 ml-2"
                                alt="Google Logo"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-between">
                        <div className="reviewer-info flex items-center mb-4">
                            <div className="avatar w-10 h-10 rounded-full bg-[#99573a] text-white flex items-center justify-center font-bold mr-2">
                                A
                            </div>
                            <div className="reviewer-name font-semibold text-gray-800">
                                Aaj


                            </div>
                        </div>
                        <div className="review-text text-gray-600 text-sm mb-2">
                            Vivekananda Home Tuitions provides excellent personal attention to each student, ensuring their academic needs are met. The centre also ensures adequate security measures are in place, giving parents peace of mind. Overall, an excellent coaching centre!                  </div>
                        <div className="review-footer flex items-center justify-between">
                            <div className="stars text-yellow-400">★★★★★</div>
                            <img
                                src="https://images.icon-icons.com/2699/PNG/512/google_logo_icon_169090.png"
                                className="google-logo w-5 ml-2"
                                alt="Google Logo"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section className="py-12 px-6 bg-[#F1F1F1]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="font-inter font-semibold text-[25px] leading-[48px] text-center mb-2">
                            We are here to answer your questions
                        </h3>
                        <p className="font-inter font-normal text-[15px] leading-[27px] text-center text-gray-600 max-w-2xl mx-auto">
                            Have Questions About Our Home Tuitions? Here's Everything You Need to
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

                                            {openIndex === index ? (
                                                <FiMinus className="w-6 h-6 p-1 rounded-full bg-[#FE6E01] text-white transition" />
                                            ) : (
                                                <FiPlus className="w-6 h-6 p-1 rounded-full bg-[#FE6E01] text-white transition" />
                                            )}
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
                                src="/Images/Demo/parent-faq.jpg"
                                alt="Tutor"
                                className="rounded-xl shadow-lg object-cover w-full max-h-[550px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Demo;