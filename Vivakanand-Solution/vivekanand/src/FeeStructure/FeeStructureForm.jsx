import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import Navbar from "../Components/NavBar";
import Select from "react-select";
import { BASE_URL } from "../api/axiosConfig";



const FeeStructureForm = () => {
    const [formData, setFormData] = useState({
        className: "",
        board: "",
        location: "",
        subjects: "",
    });

    const [feeData, setFeeData] = useState(null);
    const [showFeeModal, setShowFeeModal] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
        const [message, setMessage] = useState(""); // <-- New state for messages


    const locationOptions = [
        { value: "ALL", label: "HYDERABAD" },
        { value: "BANJARA HILLS", label: "BANJARA HILLS" },
        { value: "NANAKRAMGUDA", label: "NANAKRAMGUDA" },
        { value: "TELLAPUR", label: "TELLAPUR" },
        { value: "KONDAPUR", label: "KONDAPUR" },
        { value: "SOMAJIGUDA", label: "SOMAJIGUDA" },
        { value: "BOWENPALLY", label: "BOWENPALLY" },
        { value: "HIMAYAT NAGAR", label: "HIMAYAT NAGAR" },
        { value: "TOLICHOWKI", label: "TOLICHOWKI" },
        { value: "JUBILEE HILLS", label: "JUBILEE HILLS" },
        { value: "MANIKONDA", label: "MANIKONDA" },
        { value: "NALLAGANDLA", label: "NALLAGANDLA" },
        { value: "MADHAPUR", label: "MADHAPUR" },
        { value: "ABIDS", label: "ABIDS" },
        { value: "MALLAMPET", label: "MALLAMPET" },
        { value: "BASHEER BAGH", label: "BASHEER BAGH" },
        { value: "FILM NAGAR", label: "FILM NAGAR" },
        { value: "HITEC CITY", label: "HITEC CITY" },
        { value: "KOKAPET", label: "KOKAPET" },
        { value: "CHANDANAGAR", label: "CHANDANAGAR" },
        { value: "SRINAGAR COLONY", label: "SRINAGAR COLONY" },
        { value: "MIYAPUR", label: "MIYAPUR" },
        { value: "POCHARAM", label: "POCHARAM" },
        { value: "KHAIRATABAD", label: "KHAIRATABAD" },
        { value: "MARREDPALLY", label: "MARREDPALLY" },
        { value: "GACHIBOWLI", label: "GACHIBOWLI" },
        { value: "NARSINGI", label: "NARSINGI" },
        { value: "LINGAMPALLY", label: "LINGAMPALLY" },
        { value: "BEGUMPET", label: "BEGUMPET" },
        { value: "SHANKARPALLY", label: "SHANKARPALLY" },
        { value: "ALWAL", label: "ALWAL" },
        { value: "SHAIKPET", label: "SHAIKPET" },
        { value: "SAINIKPURI", label: "SAINIKPURI" },
        { value: "BACHUPALLY", label: "BACHUPALLY" },
        { value: "A S RAO NAGAR", label: "A S RAO NAGAR" },
        { value: "SUCHITRA", label: "SUCHITRA" },
        { value: "KHARKANA", label: "KHARKANA" },
        { value: "YAPRAL", label: "YAPRAL" },
        { value: "GANDIPET", label: "GANDIPET" },
        { value: "BHEERAMGUDA", label: "BHEERAMGUDA" },
        { value: "MADEENAGUDA", label: "MADEENAGUDA" }
    ];




    useEffect(() => {
        setShowFeeModal(true);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   const fetchFeeStructure = async () => {
        setIsLoading(true);
        setMessage(""); // clear previous messages
        setFeeData(null); // clear previous data
        try {
            const res = await api.get("/api/fee-structure/search", {
                params: formData,
            });

            if (res.data && res.data.length > 0) {
                setFeeData(res.data);
                setShowFeeModal(true);
            } else {
                // No data returned
                setMessage("❌ Fee structure is not present for these details.");
            }
        } catch (error) {
            console.error("Error fetching fee structure:", error);
setMessage("❌ Fee structure is not available for the provided details.");
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setShowFeeModal(false);
    };

    return (
        <div className="min-h-screen mt-10">
            <Navbar background="bg-[#434242]" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Page Heading */}
                <h1 className="font-inter font-semibold text-3xl sm:text-4xl leading-[48px] text-center text-[#1E1E1E]">
                    Fee Structure
                </h1>

                <p className="font-inter font-medium text-xl sm:text-2xl leading-[36px] text-center text-black mt-2">
                    Calculate Fee Structure
                </p>

                {/* Sub Heading */}
                <h2 className="mt-6 sm:mt-10 mb-4 sm:mb-6 text-lg md:text-xl font-semibold text-black text-center md:text-left">
                    Enter Details to See Fee Structure
                </h2>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Class */}
                    <div>
                        <label
                            htmlFor="className"
                            className="font-inter font-normal text-sm leading-[21px] text-[#585858] block mb-1"
                        >
                            Select Class
                        </label>
                        <select
                            id="className"
                            name="className"
                            value={formData.className}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF5D21]"
                        >
                            <option value="">-- Select --</option>
                            <option value="Nursery">NURSERY</option>
                            <option value="LKG">LKG</option>
                            <option value="UKG">UKG</option>
                            <option value="1st CLASSs">1st CLASS</option>
                            <option value="2nd CLASS">2nd CLASS</option>
                            <option value="3rd CLASS">3rd CLASS</option>
                            <option value="4th CLASS">4th CLASS</option>
                            <option value="5th CLASS">5th CLASS</option>
                            <option value="6th CLASS">6th CLASS</option>
                            <option value="7th CLASS">7th CLASS</option>
                            <option value="8th CLASS">8th CLASS</option>
                            <option value="9th CLASS">9th CLASS</option>
                            <option value="10th CLASS">10th CLASS</option>
                            <option value="11th / 12th CLASS">11th / 12th CLASS</option>
                        </select>
                    </div>

                    {/* Board */}
                    <div>
                        <label
                            htmlFor="board"
                            className="font-inter font-normal text-sm leading-[21px] text-[#585858] block mb-1"
                        >
                            Select Board
                        </label>
                        <select
                            id="board"
                            name="board"
                            value={formData.board}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF5D21]"
                        >
                            <option value="">-- Select --</option>
                            <option value="STATE">STATE</option>
                            <option value="CBSE / ICSE">CBSE / ICSE</option>
                            <option value="IB / IGCSE">IB / IGCSE</option>
                            <option value="CAMBRIDGE">CAMBRIDGE</option>
                            <option value="STATE (IPE)">STATE (IPE)</option>
                            <option value="CBSE / ICSE (IPE)">CBSE / ICSE (IPE)</option>
                            <option value="IB / IGCSE (IPE)">IB / IGCSE (IPE)</option>
                            <option value="CAMBRIDGE (IPE)">CAMBRIDGE (IPE)</option>
                            <option value="EAMCET">EAMCET</option>
                            <option value="JEE IIT">JEE IIT</option>
                            <option value="NEET">NEET</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div>
                        <label
                            htmlFor="location"
                            className="font-inter font-normal text-sm leading-[21px] text-[#585858] block mb-1"
                        >
                            Select Location
                        </label>
                        <Select
                            id="location"
                            name="location"
                            options={locationOptions}
                            value={locationOptions.find((opt) => opt.value === formData.location) || null}
                            onChange={(selected) =>
                                setFormData({ ...formData, location: selected ? selected.value : "" })
                            }
                            placeholder="Type to search..."
                            isClearable
                            className="w-full"
                        />
                    </div>

                    {/* Subjects */}
                    <div>
                        <label
                            htmlFor="subjects"
                            className="font-inter font-normal text-sm leading-[21px] text-[#585858] block mb-1"
                        >
                            Select Subjects
                        </label>
                        <select
                            id="subjects"
                            name="subjects"
                            value={formData.subjects}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF5D21]"
                        >
                            <option value="">-- Select --</option>
                            <option value="ALL SUBJECTS">ALL SUBJECTS</option>
                            <option value="ANY TWO SUBJECTS">ANY TWO SUBJECTS</option>
                    
                        </select>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center md:justify-end mt-6 sm:mt-8">
                    <button
                        className="font-inter font-medium text-sm leading-[21px] text-white bg-[#FE6E01] px-8 sm:px-14 py-2 rounded-xl transition-all duration-200 
               hover:bg-[#e14c14] hover:text-white hover:shadow-lg hover:scale-105 w-full md:w-auto"
                        onClick={fetchFeeStructure}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'See Fee Structure'}
                    </button>
                </div>
{message && (
    <div className="mt-4 flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg max-w-md mx-auto">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M8.257 3.099c.366-.756 1.428-.756 1.794 0l7.42 15.333A1 1 0 0 1 16.52 20H3.48a1 1 0 0 1-.95-1.568L8.257 3.1zM11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-4a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1z"
                clipRule="evenodd"
            />
        </svg>
        <span className="text-sm sm:text-base">{message}</span>
    </div>
)}

                {/* Fee Structure Modal */}
                {showFeeModal && feeData && feeData.length > 0 && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl relative max-h-[90vh] overflow-y-auto">
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 sm:h-6 sm:w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {/* Left Section - Basic Details */}
                                <div>
                                    <h2 className="font-semibold text-lg border-b-2 border-orange-400 inline-block mb-3">
                                        Basic Details
                                    </h2>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex flex-col sm:flex-row">
                                            <span className="font-inter font-medium text-[14px] leading-[21px] text-[#1E1E1E] w-32">
                                                Class
                                            </span>
                                            <span className="font-inter font-normal text-[14px] leading-[24px] text-[#434242]">
                                                {feeData[0].className}
                                            </span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row">
                                            <span className="font-inter font-medium text-[14px] leading-[21px] text-[#1E1E1E] w-32">
                                                Board
                                            </span>
                                            <span className="font-inter font-normal text-[14px] leading-[24px] text-[#434242]">
                                                {feeData[0].board}
                                            </span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row">
                                            <span className="font-inter font-medium text-[14px] leading-[21px] text-[#1E1E1E] w-32">
                                                Subjects
                                            </span>
                                            <span className="font-inter font-normal text-[14px] leading-[24px] text-[#434242]">
                                                {feeData[0].subjects}
                                            </span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row">
                                            <span className="font-inter font-medium text-[14px] leading-[21px] text-[#1E1E1E] w-32">
                                                Time
                                            </span>
                                            <span className="font-inter font-normal text-[14px] leading-[24px] text-[#434242]">
                                                {feeData[0].timePerDay}
                                            </span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row">
                                            <span className="font-inter font-medium text-[14px] leading-[21px] text-[#1E1E1E] w-32">
                                                Days
                                            </span>
                                            <span className="font-inter font-normal text-[14px] leading-[24px] text-[#434242]">
                                                {feeData[0].daysPerWeek}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section - Total */}
                                <div>
                                    <h2 className="font-semibold text-lg border-b-2 border-orange-400 inline-block mb-3">
                                        Total
                                    </h2>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex flex-col sm:flex-row">
                                            <span className="font-inter font-medium text-[14px] leading-[21px] text-[#1E1E1E] w-32">
                                                Tuition Fee
                                            </span>
                                            <span className="font-inter font-normal text-[14px] leading-[24px] text-[#434242]">
                                                {feeData[0].tuitionFee}/-
                                            </span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row">
                                            <span className="font-inter font-medium text-[14px] leading-[21px] text-[#1E1E1E] w-32">
                                                Extra Student Fee
                                            </span>
                                            <span className="font-inter font-normal text-[14px] leading-[24px] text-[#434242]">
                                                {feeData[0].extraStudentFee}/-
                                            </span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row">
                                            <span className="font-inter font-medium text-[14px] leading-[21px] text-[#1E1E1E] w-32">
                                                Total Fee (Monthly)
                                            </span>
                                            <span className="font-inter font-normal text-[14px] leading-[24px] text-[#434242]">
                                                {feeData[0].totalFee}/-
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Display Fee Details from API response */}

            </div>
        </div>
    );
};

export default FeeStructureForm;