import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store"; // Assuming your Zustand store is imported here
import { AiOutlinePlusCircle, AiOutlineEye } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">Admin Dashboard</div>
          <div className="flex items-center space-x-4">
            <div className="text-white">{userInfo?.username}</div>
            <button
              onClick={handleLogout}
              className="text-white flex items-center space-x-2 hover:text-gray-300"
            >
              <IoMdLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/create")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-semibold">Create Project</div>
              <AiOutlinePlusCircle size={40} className="text-indigo-600" />
            </div>
            <p className="text-gray-600">Create a new project with members.</p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/view")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-semibold">View Projects</div>
              <AiOutlineEye size={40} className="text-indigo-600" />
            </div>
            <p className="text-gray-600">View and manage existing projects.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="text-xl font-semibold mb-4">Project Stats</div>
            <ul className="space-y-2">
              <li className="flex justify-between text-gray-600">
                <span>Total Projects</span>
                <span className="font-bold">15</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Active Projects</span>
                <span className="font-bold">12</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>Completed Projects</span>
                <span className="font-bold">3</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
