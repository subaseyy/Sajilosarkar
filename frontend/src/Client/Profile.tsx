import React, { useEffect, useState } from 'react';
import Sidebar from "../Components/Sidebar/Sidebar";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  phone: string | null;
  streetAddress1: string | null;
  streetAddress2: string | null;
  city: string | null;
  image: string | null;
  getImage: string | null;
  role: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Omit<User, 'email' | 'role'>>({
    firstName: '',
    lastName: '',
    phone: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    image: null,
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      fetch('/api/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone: data.phone || '',
            streetAddress1: data.streetAddress1 || '',
            streetAddress2: data.streetAddress2 || '',
            city: data.city || '',
            image: data.image || null,
          });
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      fetch('http://localhost:8089/api/users/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setEditMode(false);
        })
        .catch(error => console.error('Error updating user data:', error));
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    if (storedToken && newPassword) {
      fetch(`http://localhost:8089/api/users/updatePassword/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      })
        .then(response => response.json())
        .then(data => {
          alert('Password changed successfully');
          setNewPassword('');
        })
        .catch(error => console.error('Error changing password:', error));
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
         
            <div className="mb-4 flex justify-center">
              <img 
                src={user.image} 
                alt="Profile" 
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="text-lg font-semibold">First Name:</p>
              {editMode ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              ) : (
                <p className="text-gray-700">{user.firstName}</p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Last Name:</p>
              {editMode ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              ) : (
                <p className="text-gray-700">{user.lastName}</p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Phone:</p>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              ) : (
                <p className="text-gray-700">{user.phone}</p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Street Address 1:</p>
              {editMode ? (
                <input
                  type="text"
                  name="streetAddress1"
                  value={formData.streetAddress1}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              ) : (
                <p className="text-gray-700">{user.streetAddress1}</p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Street Address 2:</p>
              {editMode ? (
                <input
                  type="text"
                  name="streetAddress2"
                  value={formData.streetAddress2}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              ) : (
                <p className="text-gray-700">{user.streetAddress2}</p>
              )}
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">City:</p>
              {editMode ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              ) : (
                <p className="text-gray-700">{user.city}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
          </form>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
