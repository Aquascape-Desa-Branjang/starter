import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from '../component/header';
import Pagination from "../component/pagination";
import SearchIkon from "../ikon/search.png";
import profile from "../ikon/profile.png"; // Gambar default profil

// Dummy data for users
const usersData = [
  { id: 1, name: "John Doe", email: "portal@admin.com", role: "Super Admin", status: "Active", profile: profile },
  { id: 2, name: "Jane Smith", email: "jane@admin.com", role: "Admin", status: "Inactive", profile: profile },
];

const UserAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Navigation hook

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= 3) {
      setCurrentPage(newPage);
    }
  };

  // Navigate to Add User page
  const handleAddData = () => {
    navigate("/user&adminadd");
  };

  // Navigate to Edit User page
  const handleEditData = (id) => {
    navigate(`/user&adminedit/${id}`); // Navigasi dengan ID user
  };

  return (
    <div className="flex h-screen bg-[#F9F4F4] flex-col">
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
                {usersData.map((data, index) => (
                  <tr
                    key={data.id}
                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-800">
                      <div className="flex items-center">
                        <img
                          src={data.profile}
                          alt={data.name}
                          className="w-10 h-10 rounded-full border border-gray-300"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">{data.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{data.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{data.role}</td>
                    <td className="px-4 py-2 text-sm text-center">
                      <span className={`px-3 py-1 rounded-full ${data.status === "Active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                        {data.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          className="px-3 py-1 w-24 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditData(data.id)}  // Navigasi dengan ID
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
