import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAppStore } from '@/store'; 
import { IoMdArrowBack } from 'react-icons/io';
import { ASSIGN_MANAGER_ROUTE, CREATE_PROJECT_ROUTE, GET_MANAGER_ROUTE } from '@/utils/constants';
import { apiClient } from '@/lib/api-client';


const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [manager, setManager] = useState('');
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [managersLoading, setManagersLoading] = useState(false); // Loading state for managers dropdown
  const navigate = useNavigate();
  const { userInfo } = useAppStore();

  // Fetch managers when dropdown is clicked
  const fetchManagers = async () => {
    setManagersLoading(true);
    try {
      const response = await apiClient.get(GET_MANAGER_ROUTE, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Managers fetched:', response.data);  // Log the response data
      setManagers(response.data); // Set managers in state
    } catch (error) {
      console.error('Error fetching managers:', error);  // Log the error
      toast.error('Failed to fetch managers');
    } finally {
      setManagersLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName || !manager) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Create the project
      const createProjectResponse = await apiClient.post(
        CREATE_PROJECT_ROUTE,
        { projectName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const { id: projectId } = createProjectResponse.data; // Get the created project ID

      // Assign manager to the created project
      const assignManagerUrl = ASSIGN_MANAGER_ROUTE(projectId, manager);
      await apiClient.post(
        assignManagerUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      toast.success('Project created and manager assigned successfully');
      navigate('/view'); // Redirect to view projects page
    } catch (error) {
      toast.error('Failed to create project or assign manager');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
          onClick={() => navigate('/admin')} // Go back to admin dashboard
        >
          <IoMdArrowBack size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Create Project</h2>
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label htmlFor="manager" className="block text-sm font-medium text-gray-700">
              Project Manager
            </label>
            <select
              id="manager"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              onFocus={fetchManagers} // Fetch managers when dropdown is focused
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Manager</option>
              {managersLoading ? (
                <option>Loading...</option>
              ) : (
                managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.username} {/* Display manager username */}
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center justify-center shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
            ) : (
              'Create Project'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
