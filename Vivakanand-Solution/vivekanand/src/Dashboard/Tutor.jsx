import React, { useState, useEffect } from "react";
import api, { BASE_URL } from "../api/axiosConfig"; // import BASE_URL

const Tutors = () => {
  const [showModal, setShowModal] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [selectedTutors, setSelectedTutors] = useState([]); // track selected tutors
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    classes: "",
    experience: "",
    location: "",
    image: null,
  });

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await api.get("/api/tutors");
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await api.post("/api/tutors/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Tutor added successfully!");
      setShowModal(false);
      fetchTutors();
    } catch (error) {
      console.error("Error creating tutor", error);
    }
  };

  // ✅ Select/deselect tutors
  const toggleSelectTutor = (id) => {
    setSelectedTutors((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // ✅ Delete selected tutors
  const handleDelete = async () => {
    if (selectedTutors.length === 0) {
      alert("Please select at least one tutor to delete.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete selected tutor(s)?")) {
      return;
    }

    try {
      for (let id of selectedTutors) {
        await api.delete(`/api/tutors/${id}`);
      }
      alert("Tutor(s) deleted successfully!");
      setSelectedTutors([]);
      fetchTutors();
    } catch (error) {
      console.error("Error deleting tutor", error);
    }
  };

  return (
    <div>
      <h2
        className="font-montserrat font-medium mb-4"
        style={{ fontSize: "18px", lineHeight: "24px", color: "#1E1E1E" }}
      >
        Tutors List
      </h2>

      <div className="bg-white rounded-2xl shadow p-4">
        {/* Buttons */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search"
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

          <div className="space-x-2 flex items-center">
            {/* ✅ Hooked to delete logic */}
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 text-[#FF6B35] border border-[#FF6B35] px-4 py-1 rounded-2xl transition-all duration-300 hover:bg-[#FF6B35] hover:text-white hover:scale-105 group"
            >
              <img
                src="/Images/Icons/delete-icon.png"
                alt="delete"
                className="w-4 h-4 transition-all duration-300 group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              <span
                className="font-medium text-[16px] leading-6 text-center"
                style={{ fontFamily: "Montserrat" }}
              >
                Remove
              </span>
            </button>

            <button
              className="bg-[#FF6B35] text-white px-5 py-1.5 rounded-2xl transition-all duration-300 hover:bg-[#e85a28] hover:scale-105"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                textAlign: "center",
              }}
              onClick={() => setShowModal(true)}
            >
              + Add Tutors
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left  border-collapse">
          <thead className="bg-[#FFE1D6]">
            <tr>
              <th   className="p-3 font-inter font-medium text-center"
                                style={{ fontSize: "14px", lineHeight: "21px", color: "#1E1E1E" }}>
                Select
              </th>
                                        <th
                                className="p-3 font-inter font-medium text-center"
                                style={{ fontSize: "14px", lineHeight: "21px", color: "#1E1E1E" }}
                            >
                                ID
                            </th>
                            <th
                                className="p-3 font-inter font-medium text-center"
                                style={{ fontSize: "14px", lineHeight: "21px", color: "#1E1E1E" }}
                            >
                                Name
                            </th>
                            <th
                                className="p-3 font-inter font-medium text-center"
                                style={{ fontSize: "14px", lineHeight: "21px", color: "#1E1E1E" }}
                            >
                                Subject
                            </th>
                            <th
                                className="p-3 font-inter font-medium text-center"
                                style={{ fontSize: "14px", lineHeight: "21px", color: "#1E1E1E" }}
                            >
                                Qualification
                            </th>
                            <th
                                className="p-3 font-inter font-medium text-center"
                                style={{ fontSize: "14px", lineHeight: "21px", color: "#1E1E1E" }}
                            >
                                
Experience
                            </th>
                            <th
                                className="p-3 font-inter font-medium text-center"
                                style={{ fontSize: "14px", lineHeight: "21px", color: "#1E1E1E" }}
                            >
                                Location
                            </th>
                            <th
                                className="p-3 font-inter font-medium text-center"
                                style={{ fontSize: "14px", lineHeight: "21px", color: "#1E1E1E" }}
                            >
                                Image
                            </th>

            </tr>
          </thead>
          <tbody>
            {tutors.length > 0 ? (
              tutors.map((tutor) => (
                <tr key={tutor.id} className="border-b">
                  {/* ✅ Checkbox for selecting tutor */}
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedTutors.includes(tutor.id)}
                      onChange={() => toggleSelectTutor(tutor.id)}
                    />
                  </td>
                  <td className="p-3 text-center">{tutor.id}</td>
                  <td className="p-3 text-center">{tutor.name}</td>
                  <td className="p-3 text-center">{tutor.subject}</td>
                  <td className="p-3 text-center">{tutor.classes}</td>
                  <td className="p-3 text-center">{tutor.experience}</td>
                  <td className="p-3 text-center">{tutor.location}</td>
                 <td className="p-3 text-center cursor-pointer">
    <img
        src={`${BASE_URL}/uploads/${tutor.imageUrl}`}
        alt="Tutor"
        className="w-12 h-12 object-cover rounded-full mx-auto"
    />
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No tutors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal (same design kept) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6 z-10">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add Tutor
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="classes"
                placeholder="Qualification"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutors;
