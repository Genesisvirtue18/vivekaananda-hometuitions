import React, { useState } from "react";
import { FiUsers, FiBook, FiCreditCard, FiMail, FiBell, FiMessageSquare } from "react-icons/fi";
import Students from "../Dashboard/Student";
import Tutors from "../Dashboard/Tutor";
import JoinTutor from "../Dashboard/Join-tutor";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("students");

  const renderContent = () => {
    switch (activeTab) {
      case "students":
        return <Students />;
      case "tutors":
        return <Tutors />;
      case "Join-tutor":
        return <JoinTutor />;
      default:
        return <p>Select a tab</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFF7F3]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FFDDD1] p-6">
        <h1
          className="font-montserrat font-semibold mb-8"
          style={{ fontSize: "20px", lineHeight: "24px" }}
        >
          Vivekanand Home Tuitions
        </h1>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md ${activeTab === "students" ? "bg-orange-500 text-white" : "hover:bg-gray-100"
              }`}
          >
            <FiUsers />
            <span
              className="font-montserrat font-medium text-center"
              style={{ fontSize: "16px", lineHeight: "24px" , color: "#1E1E1E" }}
            >
              Students
            </span>
          </button>
          <button
            onClick={() => setActiveTab("tutors")}
            className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md ${activeTab === "tutors" ? "bg-orange-500 text-white" : "hover:bg-gray-100"
              }`}
          >
            <FiBook /> <span className="font-montserrat font-medium text-center"
              style={{ fontSize: "16px", lineHeight: "24px" , color: "#1E1E1E"}}>Expert Tutor</span>
          </button>
          <button
            onClick={() => setActiveTab("Join-tutor")}
            className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md ${activeTab === "payments" ? "bg-orange-500 text-white" : "hover:bg-gray-100"
              }`}
          >
            <FiCreditCard /> <span className="font-montserrat font-medium text-center"
              style={{ fontSize: "16px", lineHeight: "24px" , color: "#1E1E1E" }}>Joined as a tutor</span>
          </button>
         
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-end items-center mb-6 space-x-4">
         
        
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
