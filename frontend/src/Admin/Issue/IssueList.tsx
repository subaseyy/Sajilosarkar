import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";

interface Issue {
  id: number;
  title: string;
  location: string;
  status: boolean;
}

const IssueTable: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  console.log("token:", token);

  useEffect(() => {
    if (token) {
      axios
        .get<Issue[]>("/api/issue/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const fetchedIssues = Array.isArray(response.data) ? response.data : [];
          setIssues(fetchedIssues);
        })
        .catch((error) => {
          console.error("Failed to fetch issues:", error);
          setError("Failed to fetch issues.");
        });
    } else {
      setError("No authentication token found.");
    }
  }, [token]);

  const handleShowModal = (issue: Issue) => {
    setSelectedIssue(issue);
    setNewStatus(issue.status.toString());
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSave = () => {
    if (selectedIssue) {
      axios
        .put(
          `/api/issue/${selectedIssue.id}/status`,
          { status: newStatus === "true" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          setIssues((prevIssues) =>
            prevIssues.map((issue) =>
              issue.id === selectedIssue.id
                ? { ...issue, status: newStatus === "true" }
                : issue
            )
          );
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Failed to update status:", error);
          setError("Failed to update status.");
        });
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Issue List</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Location</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(issues) && issues.length > 0 ? (
                issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{issue.id}</td>
                    <td className="px-4 py-2 border-b">{issue.title}</td>
                    <td className="px-4 py-2 border-b">{issue.location}</td>
                    <td className="px-4 py-2 border-b">
                      {issue.status ? "Resolved" : "Unresolved"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleShowModal(issue)}
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-2 border-b text-center">
                    No issues found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && selectedIssue && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">
                Update Status for Issue {selectedIssue.id}
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="true">Resolved</option>
                  <option value="false">Unresolved</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IssueTable;
