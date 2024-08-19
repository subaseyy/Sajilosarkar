import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";

interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  // Add other relevant fields
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("/api/users/list", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
      })
      .then((response) => {
        // Log the response to check the actual data structure
        console.log("API Response:", response.data);
        console.log("token:", token);
        // Adjust the data handling based on the actual structure
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          console.error("Unexpected data structure:", response.data);
        }
      })
      .catch((error) => console.error("Failed to fetch users:", error));
  };

  const handleShowModal = (user: UserDto) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      axios
        .delete(`/api/users/${selectedUser.id}/delete`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        })
        .then(() => {
          setUsers(users.filter((user) => user.id !== selectedUser.id));
          setShowModal(false);
        })
        .catch((error) => console.error("Failed to delete user:", error));
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">First Name</th>
                <th className="px-4 py-2 border-b">Last Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Role</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{user.id}</td>
                    <td className="px-4 py-2 border-b">{user.firstName}</td>
                    <td className="px-4 py-2 border-b">{user.lastName}</td>
                    <td className="px-4 py-2 border-b">{user.email}</td>
                    <td className="px-4 py-2 border-b">{user.role}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleShowModal(user)}
                      >
                        View / Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-2 border-b text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">
                User Details for {selectedUser.firstName} {selectedUser.lastName}
              </h3>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              {/* Add more user details as needed */}
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleDeleteUser}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserManagement;
