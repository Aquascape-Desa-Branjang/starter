import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import Pagination from "../component/pagination";

// Dummy data for roles
const rolesData = [
  { id: 1, name: "Super Admin", role: "Super Admin" },
  { id: 2, name: "Admin Manager", role: "Normal" },
];

const RolesPermission = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const itemsPerPage = 5;

  // Filter roles data based on search term
  const filteredRoles = rolesData.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate data
  const currentRoles = filteredRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredRoles.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Navigate to Add Role page
  const handleAddData = () => {
    navigate("/rolespermissionadd");
  };

  // Navigate to Edit Role page
  const handleEditData = (id) => {
    navigate(`/rolespermissionedit/${id}`);
  };

  return (
    <div className="flex h-screen bg-[#F9F4F4] flex-col">
      <Header
        pageName="Roles & Permission"
        databaseName="Database / List Roles & Permission"
        notifications={0}
      />
      <div className="flex h-full">
        <div className="flex-1 p-6">
          <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="w-full max-w-3xl h-10 px-4 pl-4 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                onClick={handleAddData}
                className="ml-4 px-6 py-2 w-48 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
              >
                Add Role
              </button>
            </div>

            <table className="min-w-full table-auto mb-6">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRoles.map((role, index) => (
                  <tr
                    key={role.id}
                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-800">{role.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          role.role === "Super Admin" ? "bg-green-500" : "bg-gray-500"
                        }`}
                      >
                        {role.role}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          onClick={() => console.log("Delete clicked", role.id)}
                          className="px-3 py-1 w-24 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditData(role.id)}
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

export default RolesPermission;
