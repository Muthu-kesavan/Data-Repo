import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store'; 
import { GET_ASSIGNED_PROJECTS_ROUTE } from '@/utils/constants'; 
import { toast } from 'sonner'; 
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const { userInfo, setUserInfo } = useAppStore(); 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get(
          GET_ASSIGNED_PROJECTS_ROUTE(userInfo.id), 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
          }
        );
        setProjects(response.data); 
      } catch (error) {
        toast.error('Failed to fetch assigned projects');
      } finally {
        setLoading(false); 
      }
    };

    fetchProjects();
  }, [userInfo.id]);

  const handleLogout = () => {
    setUserInfo(null); 
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Manager Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">
            Welcome, {userInfo?.username || 'Manager'}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Assigned Projects</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <AiOutlineLoading3Quarters className="animate-spin text-4xl text-indigo-600" />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white shadow-md rounded-lg p-6 border border-gray-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Assigned Manager:</span>{' '}
                    {project.assignedManager?.username || 'Unassigned'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg">No projects assigned yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
