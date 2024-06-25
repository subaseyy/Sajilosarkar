import React, { useState, ChangeEvent, FormEvent } from 'react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
  title: string;
  category: string;
  location: string;
  description: string;
  priority: string;
}

const NewIssueReport: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "Roads",
    location: "",
    description: "",
    priority: "Low",
  });

  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;

    if (files && files.length > 0) {
      setImage(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not authorized. Please login.');
      return;
    }
    const data = new FormData();
    data.append('issue', new Blob([JSON.stringify(formData)], { type: 'application/json' }));

    if (image) {
      data.append('image', image);
    }

    if (!userId) {
      alert('User not found. Please login.');
      return;
    } else {
      data.append('userId', userId);
    }

    try {
      const response = await axios.post("/api/issue/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(response.data);
      navigate('/dashboard/report-issue/report-list');
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Failed to submit issue. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Report an Issue</h1>
        <h2 className="text-2xl font-semibold mb-4">New Report</h2>
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Roads</option>
              <option>Electricity</option>
              <option>Parking</option>
              <option>Bus</option>
              <option>Garbage</option>
              <option>Cycling</option>
              <option>Walking</option>
              <option>Streetlights</option>
              <option>Footpath</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Issue Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority Level</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Images</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewIssueReport;
