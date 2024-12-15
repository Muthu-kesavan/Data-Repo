import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GET_ASSIGNED_PROJECTS_ROUTE } from '@/utils/constants';
import { apiClient } from '@/lib/api-client';

const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userInfo } = useAppStore();

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
        console.error('Error fetching projects:', error);
        toast.error('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userInfo.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No projects assigned yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Assigned Projects</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Project Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Assigned Manager</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-100">
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">{project.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                  {project.assignedManager?.username || 'Unassigned'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProject;
