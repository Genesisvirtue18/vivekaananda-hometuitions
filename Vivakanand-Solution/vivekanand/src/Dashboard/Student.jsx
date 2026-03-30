import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { FiTrash2 } from "react-icons/fi";

const Students = () => {
    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get("/api/bookings");
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one student to remove.");
            return;
        }

        try {
            await Promise.all(selectedIds.map((id) => api.delete(`/api/bookings/${id}`)));
            setBookings((prev) => prev.filter((booking) => !selectedIds.includes(booking.id)));
            setSelectedIds([]);
            alert("Selected students deleted successfully!");
        } catch (error) {
            console.error("Error deleting students:", error);
        }
    };

    // Flatten children into individual student records for display
    const flattenedStudents = bookings.flatMap(booking =>
        booking.children.map(child => ({
            ...child,
            parentId: booking.id,
            contactNumber: booking.contactNumber,
            email: booking.email,
            location: booking.location,
            preferredTime: booking.preferredTime,
            preferredTimingByParent: booking.preferredTimingByParent,
            tutorGender: booking.tutorGender,
            frequency: booking.frequency
        }))
    );

    const filteredStudents = flattenedStudents.filter((student) =>
        student.childName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2 className="font-montserrat font-medium mb-4 text-[18px] leading-[24px] text-[#1E1E1E]">
                Students List
            </h2>

            <div className="bg-white rounded-xl shadow p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-1/3">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-full pl-8 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 border border-[#9E9E9E]"
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

                    <div className="space-x-2 flex items-center">
                        <button
                            onClick={handleDelete}
                            className="flex items-center space-x-2 text-[#FF6B35] border border-[#FF6B35] px-4 py-1 rounded-2xl transition-all duration-300 hover:bg-[#FF6B35] hover:text-white hover:scale-105"
                        >
                            <FiTrash2 className="w-4 h-4" />
                            <span className="font-medium text-[16px] leading-6 text-center font-montserrat">
                                Remove
                            </span>
                        </button>
                    </div>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead className="bg-orange-100">
                        <tr>
                            <th className="p-3 text-center text-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === bookings.length && bookings.length > 0}
                                    onChange={(e) =>
                                        setSelectedIds(
                                            e.target.checked ? bookings.map((b) => b.id) : []
                                        )
                                    }
                                />
                            </th>
                            <th className="p-3 font-inter font-medium text-center text-sm">ID</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Name</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Class</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Board</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Time</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Location</th>
                            <th className="p-3 font-inter font-medium text-center text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking.id} className="border-b">
                                    <td className="p-3 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(booking.id)}
                                            onChange={() => handleCheckboxChange(booking.id)}
                                        />
                                    </td>
                                    <td className="p-3 text-center text-sm">{booking.id}</td>
                                    <td className="p-3 text-center text-sm">
                                        {booking.children.map((child) => (
                                            <div key={child.id}>{child.childName}</div>
                                        ))}
                                    </td>
                                    <td className="p-3 text-center text-sm">
                                        {booking.children.map((child) => (
                                            <div key={child.id}>{child.grade}</div>
                                        ))}
                                    </td>
                                    <td className="p-3 text-center text-sm">
                                        {booking.children.map((child) => (
                                            <div key={child.id}>{child.board}</div>
                                        ))}
                                    </td>
                                    <td className="p-3 text-center text-sm">{booking.preferredTime}</td>
                                    <td className="p-3 text-center text-sm">{booking.location}</td>
                                    <td
                                        className="p-3 text-blue-600 cursor-pointer text-center text-sm"
                                        onClick={() => setModalData(booking)}
                                    >
                                        View Details
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center p-3 text-gray-500">
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

       {modalData && (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
        <div className="bg-white rounded-2xl shadow-xl w-[450px] p-4 relative border-2 border-[#FE6E01]">
            <button
                onClick={() => setModalData(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg font-bold"
            >
                ×
            </button>

            <h3 className="text-lg font-semibold mb-4 text-center font-inter">
                Student Details
            </h3>

            {modalData.children.map((child, index) => (
                <div key={child.id} className="mb-3">
                    <h4 className="text-black font-inter font-medium text-sm leading-5 text-left border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                        {index + 1}. {child.childName}'s Information
                    </h4>
                    <ul className="space-y-1 text-xs">
                        <li>
                            <strong>Class:</strong> {child.grade}
                        </li>
                        <li>
                            <strong>Board:</strong> {child.board}
                        </li>
                        <li>
                            <strong>Subjects:</strong> {child.subjects.join(", ")}
                        </li>
                    </ul>
                </div>
            ))}

            <div className="mt-3">
                <h4 className="text-black font-inter font-medium text-sm leading-5 text-left border-b-2 border-[#FF6B35] w-fit mb-2 pb-1">
                    Parent Information
                </h4>
                <ul className="space-y-1 text-xs">
                    <li><strong>Contact:</strong> {modalData.contactNumber}</li>
                    <li><strong>Email:</strong> {modalData.email}</li>
                    <li><strong>Location:</strong> {modalData.location}</li>
                    <li><strong>Preferred Time:</strong> {modalData.preferredTime}</li>
                    <li><strong>Frequency:</strong> {modalData.frequency}</li>
                    <li><strong>Tutor Gender:</strong> {modalData.tutorGender}</li>
                </ul>
            </div>
        </div>
    </div>
)}



        </div>
    );
};

export default Students;