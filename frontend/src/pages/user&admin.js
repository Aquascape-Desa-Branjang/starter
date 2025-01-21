import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../component/header';
import Pagination from "../component/pagination";
import SearchIkon from "../ikon/search.png";

const UserAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState([]); // State untuk data pengguna
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const navigate = useNavigate();

  // Fetch data dari server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/accounts");
        const data = await response.json();
        console.log("Fetched data:", data); // Debug log
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  // Handle halaman pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= 3) {
      setCurrentPage(newPage);
    }
  };

  // Navigasi ke halaman tambah user
  const handleAddData = () => {
    navigate("/user&adminadd");
  };

  // Navigasi ke halaman edit user
  const handleEditData = (id) => {
    navigate(`/user&adminedit/${id}`);
  };

  // Handle hapus data
  const handleDeleteData = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/accounts/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setUsersData(usersData.filter((user) => user._id !== id));
          alert("User deleted successfully.");
        } else {
          alert("Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Filter data berdasarkan pencarian
  const filteredData = usersData.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4] flex-col">
      <Header pageName="Users Admin" databaseName="Database / List Users Admin" notifications={0} />
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-3xl h-10 px-4 pl-10 border border-gray-300 rounded-lg"
                />
                <img
                  src={SearchIkon}
                  alt="Search Icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
              </div>

              <button
                onClick={handleAddData}
                className="ml-4 px-6 py-2 w-48 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
              >
                Add Data
              </button>
            </div>

            <table className="min-w-full table-auto mb-6">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700"></th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr
                    key={data._id}
                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-800">
                      <div className="flex items-center">
                        <img
                          src={`data:image/png;base64,${data.photo}`} // Decode base64 image
                          alt={data.name}
                          className="w-10 h-10 rounded-full border border-gray-300"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">{data.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{data.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{data.role}</td>
                    <td className="px-4 py-2 text-sm text-center">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          data.status === "active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                        }`}
                      >
                        {data.status.charAt(0).toUpperCase() + data.status.slice(1)} {/* Capitalize */}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          onClick={() => handleDeleteData(data._id)}
                          className="px-3 py-1 w-24 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditData(data._id)}
                          className="px-3 py-1 w-24 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
