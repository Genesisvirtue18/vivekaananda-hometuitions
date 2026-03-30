import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { FiTrash2, FiEdit, FiSave, FiX } from "react-icons/fi";
import { BASE_URL } from "../api/axiosConfig";

const Tutors = () => {
    const [tutors, setTutors] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [aadharFile, setAadharFile] = useState(null);
    const [languages, setLanguages] = useState([]);

    // Fetch tutors from backend
    useEffect(() => {
        fetchTutors();
    }, []);

    const fetchTutors = async () => {
        try {
            const response = await api.get("/api/tutors/all");
            setTutors(response.data);
        } catch (error) {
            console.error("Error fetching tutors:", error);
        }
    };

    // Toggle checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    // Delete tutors
    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one tutor to remove.");
            return;
        }

        try {
            await Promise.all(selectedIds.map((id) => api.delete(`/api/tutors/deleteApplication/${id}`)));
            setTutors((prev) => prev.filter((t) => !selectedIds.includes(t.id)));
            setSelectedIds([]);
            alert("Selected tutors deleted successfully!");
        } catch (error) {
            console.error("Error deleting tutors:", error);
        }
    };

    // Handle opening edit mode
    const handleEdit = (tutor) => {
        setModalData(tutor);
        setEditData({ ...tutor });

        // Parse languages from comma-separated strings to array of objects
        if (tutor.language && tutor.proficiency) {
            const langArray = tutor.language.split(',');
            const profArray = tutor.proficiency.split(',');
            const langObjects = langArray.map((lang, index) => ({
                language: lang.trim(),
                proficiency: profArray[index] ? profArray[index].trim() : ''
            }));
            setLanguages(langObjects);
        } else {
            setLanguages([{ language: '', proficiency: '' }]);
        }

        setIsEditing(true);
    };

    // Handle input changes in edit mode
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle language input changes
    const handleLanguageChange = (index, field, value) => {
        const updatedLanguages = [...languages];
        updatedLanguages[index][field] = value;
        setLanguages(updatedLanguages);
    };

    // Add a new language field
    const addLanguageField = () => {
        setLanguages([...languages, { language: '', proficiency: '' }]);
    };

    // Remove a language field
    const removeLanguageField = (index) => {
        if (languages.length > 1) {
            const updatedLanguages = [...languages];
            updatedLanguages.splice(index, 1);
            setLanguages(updatedLanguages);
        }
    };

    // Handle file changes
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'photo') {
            setPhotoFile(file);
        } else if (type === 'aadhar') {
            setAadharFile(file);
        }
    };

    // Submit updated data to backend
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Prepare languages for backend (convert to comma-separated strings)
            const langNames = languages.map(lang => lang.language);
            const langProfs = languages.map(lang => lang.proficiency);

            const updatedData = {
                ...editData,
                languages: languages.map(lang => ({
                    language: lang.language,
                    proficiency: lang.proficiency
                }))
            };

            formData.append("dto", new Blob([JSON.stringify(updatedData)], {
                type: "application/json"
            }));

            if (photoFile) {
                formData.append("photo", photoFile);
            }

            if (aadharFile) {
                formData.append("aadhar", aadharFile);
            }

            const response = await api.put(`/api/tutors/update/${editData.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            // Update local state with the response
            setTutors(prev => prev.map(t => t.id === editData.id ? response.data : t));
            setModalData(response.data);
            setIsEditing(false);
            setPhotoFile(null);
            setAadharFile(null);

            alert("Tutor details updated successfully!");
        } catch (error) {
            console.error("Error updating tutor:", error);
            alert("Failed to update tutor details. Please try again.");
        }
    };

    // Cancel edit mode
    const cancelEdit = () => {
        setIsEditing(false);
        setEditData(null);
        setPhotoFile(null);
        setAadharFile(null);
    };

    // Search tutors by name
    const filteredTutors = tutors.filter((tutor) =>
        tutor.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2
                className="font-montserrat font-medium mb-4"
                style={{ fontSize: "18px", lineHeight: "24px", color: "#1E1E1E" }}
            >
                Tutors List
            </h2>

            <div className="bg-white rounded-xl shadow p-4">
                {/* Search + Buttons */}
                <div className="flex justify-between items-center mb-4">
                    {/* Search bar */}
                    <div className="relative w-1/3">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-full pl-8 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                            style={{ border: "1px solid #9E9E9E" }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                            />
                        </svg>
                    </div>

                    {/* Buttons */}
                    <div className="space-x-2 flex items-center">
                        <button
                            onClick={handleDelete}
                            className="flex items-center space-x-2 text-[#FF6B35] border border-[#FF6B35] px-4 py-1 rounded-2xl transition-all duration-300 hover:bg-[#FF6B35] hover:text-white hover:scale-105 group"
                        >
                            <FiTrash2 className="w-4 h-4" />
                            <span
                                className="font-medium text-[16px] leading-6 text-center"
                                style={{ fontFamily: "Montserrat" }}
                            >
                                Remove
                            </span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full text-left border-collapse">
                    <thead className="bg-orange-100">
                        <tr>
                            <th className="p-3 text-center text-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === tutors.length && tutors.length > 0}
                                    onChange={(e) =>
                                        setSelectedIds(
                                            e.target.checked ? tutors.map((t) => t.id) : []
                                        )
                                    }
                                />
                            </th>
                            <th className="p-3 font-inter font-medium text-center text-sm">ID</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Name</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Qualification</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">University</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Phone</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Location</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTutors.length > 0 ? (
                            filteredTutors.map((tutor) => (
                                <tr key={tutor.id} className="border-b">
                                    <td className="p-3 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(tutor.id)}
                                            onChange={() => handleCheckboxChange(tutor.id)}
                                        />
                                    </td>
                                    <td className="p-3 text-center text-sm">{tutor.id}</td>
                                    <td className="p-3 text-center text-sm">{tutor.name}</td>
                                    <td className="p-3 text-center text-sm">{tutor.qualification}</td>
                                    <td className="p-3 text-center text-sm">{tutor.university}</td>
                                    <td className="p-3 text-center text-sm">{tutor.phone}</td>
                                    <td className="p-3 text-center text-sm">{tutor.currentLocation}</td>
                                    <td className="p-3 text-center text-sm">
                                        <button
                                            onClick={() => setModalData(tutor)}
                                            className="text-blue-600 hover:underline mr-2"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEdit(tutor)}
                                            className="text-green-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center p-3 text-gray-500">
                                    No tutors found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for details and editing */}
            {modalData && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-[95%] max-w-[600px] max-h-[90vh] relative overflow-y-auto border-2 border-[#FE6E01]">
                        {isEditing ? (
                            // Edit Form
                            <form onSubmit={handleUpdate}>
                                <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">Edit Tutor Details</h2>
                                    <div className="flex space-x-2">
                                        <button
                                            type="submit"
                                            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-md"
                                        >
                                            <FiSave className="w-4 h-4" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="flex items-center space-x-1 bg-gray-500 text-white px-3 py-1 rounded-md"
                                        >
                                            <FiX className="w-4 h-4" />
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        {/* Personal Details */}
                                        <div className="sm:col-span-2">
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Personal Details
                                            </h4>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editData.name || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                                            <input
                                                type="text"
                                                name="fatherName"
                                                value={editData.fatherName || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Qualification</label>
                                            <input
                                                type="text"
                                                name="qualification"
                                                value={editData.qualification || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">University</label>
                                            <input
                                                type="text"
                                                name="university"
                                                value={editData.university || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Percentage</label>
                                            <input
                                                type="number"
                                                name="percentage"
                                                value={editData.percentage || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                                            <input
                                                type="number"
                                                name="passingYear"
                                                value={editData.passingYear || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Intermediate College</label>
                                            <input
                                                type="text"
                                                name="interCollege"
                                                value={editData.interCollege || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Intermediate Percentage</label>
                                            <input
                                                type="number"
                                                name="interPercentage"
                                                value={editData.interPercentage || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">School Name</label>
                                            <input
                                                type="text"
                                                name="schoolName"
                                                value={editData.schoolName || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>

                                        {/* Tutoring Details */}
                                        <div className="sm:col-span-2 mt-4">
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Tutoring Details
                                            </h4>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Classes Handled</label>
                                            <input
                                                type="text"
                                                name="classesHandled"
                                                value={editData.classesHandled || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Subjects Taught</label>
                                            <input
                                                type="text"
                                                name="subjectsTaught"
                                                value={editData.subjectsTaught || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                                            <input
                                                type="number"
                                                name="previousTutoringExperience"
                                                value={editData.previousTutoringExperience || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Classes Taught</label>
                                            <input
                                                type="text"
                                                name="classesTaught"
                                                value={editData.classesTaught || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>

                                        {/* Location Details */}
                                        <div className="sm:col-span-2 mt-4">
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Location Details
                                            </h4>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Current Location</label>
                                            <input
                                                type="text"
                                                name="currentLocation"
                                                value={editData.currentLocation || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Preferred Location</label>
                                            <input
                                                type="text"
                                                name="preferredLocation"
                                                value={editData.preferredLocation || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>

                                        {/* Contact Information */}
                                        <div className="sm:col-span-2 mt-4">
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Contact Information
                                            </h4>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={editData.phone || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Alternate Phone</label>
                                            <input
                                                type="text"
                                                name="altPhone"
                                                value={editData.altPhone || ''}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            />
                                        </div>

                                        {/* Additional Information */}
                                        <div className="sm:col-span-2 mt-4">
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Additional Information
                                            </h4>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Has Bike</label>
                                            <select
                                                name="hasBike"
                                                value={editData.hasBike ? "true" : "false"}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                            >
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                       <div>
  <label className="block text-sm font-medium text-gray-700">Syllabus</label>
  <select
    name="syllabus"
    value={editData.syllabus || ""}
    onChange={handleInputChange}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
               focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
    required
  >
    <option value="">Select board</option>
    <option value="CBSE">CBSE</option>
    <option value="ICSE">ICSE</option>
    <option value="IGSCE">IGSCE</option>
    <option value="IB">IB</option>
    <option value="CAMBRIDGE">Cambridge</option>
    <option value="STATE">State</option>
    <option value="IIT">IIT</option>
    <option value="OLYMPIAD">Olympiad</option>
  </select>
</div>


                                        {/* Languages */}
                                        <div className="sm:col-span-2 mt-4">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                    Languages
                                                </h4>
                                                <button
                                                    type="button"
                                                    onClick={addLanguageField}
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    + Add Language
                                                </button>
                                            </div>
                                            {languages.map((lang, index) => (
                                                <div key={index} className="flex space-x-2 mb-2">
                                                    <div className="flex-1">
                                                        <label className="block text-sm font-medium text-gray-700">Language</label>
                                                        <input
                                                            type="text"
                                                            value={lang.language}
                                                            onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="block text-sm font-medium text-gray-700">Proficiency</label>
                                                        <select
                                                            value={lang.proficiency}
                                                            onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2 border"
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="1">1 - Basic</option>
                                                            <option value="2">2 - Intermediate</option>
                                                            <option value="3">3 - Fluent</option>
                                                            <option value="4">4 - Advanced</option>
                                                            <option value="5">5 - Native</option>

                                                        </select>
                                                    </div>
                                                    {languages.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLanguageField(index)}
                                                            className="text-red-600 mt-6"
                                                        >
                                                            <FiX className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Documents Section */}
                                        <div className="sm:col-span-2 mt-6 border-t pt-4">
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-3 pb-1">
                                                Documents
                                            </h4>
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                {/* Photo */}
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm mb-2">Tutor Photo</p>
                                                    {modalData.photoPath ? (
                                                        <img
                                                            src={`${BASE_URL}/${modalData.photoPath.replace(/^\/+/, "")}`}
                                                            alt="Tutor Photo"
                                                            className="w-full h-40 object-cover rounded-lg shadow mb-2"
                                                        />
                                                    ) : (
                                                        <p className="text-gray-500 text-sm mb-2">No Photo Uploaded</p>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'photo')}
                                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                                    />
                                                </div>

                                                {/* Aadhaar */}
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm mb-2">Aadhaar</p>
                                                    {modalData.aadharPath ? (
                                                        <img
                                                            src={`${BASE_URL}/${modalData.aadharPath.replace(/^\/+/, "")}`}
                                                            alt="Aadhaar"
                                                            className="w-full h-40 object-cover rounded-lg shadow mb-2"
                                                        />
                                                    ) : (
                                                        <p className="text-gray-500 text-sm mb-2">No Aadhaar Uploaded</p>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'aadhar')}
                                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            // View Mode
                            <>
                                <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={
                                                modalData.photoPath
                                                    ? `${BASE_URL}/${modalData.photoPath.replace(/^\/+/, "")}`
                                                    : "https://via.placeholder.com/80"
                                            }
                                            alt={modalData.name}
                                            className="w-12 h-12 rounded-full object-cover border border-[#FE6E01]"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold font-inter">{modalData.name}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleEdit(modalData)}
                                            className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                                        >
                                            <FiEdit className="w-4 h-4" />
                                            <span>Edit</span>
                                        </button>

                                        <button
                                            onClick={() => setModalData(null)}
                                            className="text-gray-500 hover:text-black text-xl font-bold"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4">
                                    {/* View mode content (same as before) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        {/* Personal Details */}
                                        <div>
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Personal Details
                                            </h4>
                                            <ul className="space-y-1">
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Tutor ID:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.id}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Father's Name:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.fatherName}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Highest Qualification:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.qualification}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        College/University:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.university}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        College Percentage:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.percentage} %
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Intermediate college name:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.interCollege}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Intermediate Percentage:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.interPercentage} %
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Year of Passing Out:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.passingYear}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        10th Class School:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.schoolName}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Tutoring Details */}
                                        <div>
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Tutoring Details
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Classes Handled Upto:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.classesHandled}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Subjects:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {Array.isArray(modalData.subjectsTaught)
                                                            ? modalData.subjectsTaught.join(", ")
                                                            : modalData.subjectsTaught}
                                                    </span>
                                                </li>

                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Experience:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.previousTutoringExperience} years
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Previous Classes:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.classesTaught}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Location Details */}
                                        <div>
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Location Details
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Current Location:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.currentLocation}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Preferred Locations:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.preferredLocation}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Contact Information */}
                                        <div>
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Contact Information
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Phone:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.phone}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Alternate Number:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.altPhone}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Additional Information */}
                                        <div className="sm:col-span-2">
                                            <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                                                Additional Information
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Vehicle:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.hasBike ? "Yes" : "No"}
                                                    </span>
                                                </li>

                                                 <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Schooling syllabus:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.syllabus}
                                                    </span>
                                                </li>
                                                <li>
                                                    <strong className="font-inter font-medium text-[14px] text-[#1E1E1E]">
                                                        Languages:
                                                    </strong>
                                                    <span className="font-inter text-[14px] text-[#434242] ml-1">
                                                        {modalData.language && modalData.proficiency &&
                                                            modalData.language.split(",").map((lang, idx) => {
                                                                const prof = modalData.proficiency.split(",")[idx];
                                                                return `${lang} (${prof})`;
                                                            }).join(", ")}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Documents Section */}
                                    <div className="mt-6 border-t pt-4">
                                        <h4 className="font-medium text-[15px] border-b-2 border-[#FF6B35] w-fit mb-3 pb-1">
                                            Documents
                                        </h4>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Photo */}
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm mb-2">Tutor Photo</p>
                                                {modalData.photoPath ? (
                                                    <>
                                                        <img
                                                            src={`${BASE_URL}/${modalData.photoPath.replace(/^\/+/, "")}`}
                                                            alt="Tutor Photo"
                                                            className="w-full h-40 object-cover rounded-lg shadow"
                                                        />
                                                        <a
                                                            href={`${BASE_URL}/${modalData.photoPath.replace(/^\/+/, "")}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                                                        >
                                                            View Full Photo
                                                        </a>
                                                    </>
                                                ) : (
                                                    <p className="text-gray-500 text-sm">No Photo Uploaded</p>
                                                )}
                                            </div>

                                            {/* Aadhaar */}
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm mb-2">Aadhaar</p>
                                                {modalData.aadharPath ? (
                                                    <>
                                                        <img
                                                            src={`${BASE_URL}/${modalData.aadharPath.replace(/^\/+/, "")}`}
                                                            alt="Aadhaar"
                                                            className="w-full h-40 object-cover rounded-lg shadow"
                                                        />
                                                        <a
                                                            href={`${BASE_URL}/${modalData.aadharPath.replace(/^\/+/, "")}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                                                        >
                                                            View Aadhaar
                                                        </a>
                                                    </>
                                                ) : (
                                                    <p className="text-gray-500 text-sm">No Aadhaar Uploaded</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Close button for view mode */}
                        {!isEditing && (
                            <button
                                onClick={() => setModalData(null)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tutors;