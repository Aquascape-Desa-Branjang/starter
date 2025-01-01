import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../component/header";

const RolesPermissionEdit = () => {
  const { id } = useParams();
  const [roles, setRoles] = useState([
    { id: 1, name: "Super Admin", role: "Super Admin" },
    { id: 2, name: "Admin Manager", role: "Normal" },
  ]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const roleToEdit = roles.find((role) => role.id === parseInt(id));
    if (roleToEdit) {
      setName(roleToEdit.name);
      setRole(roleToEdit.role);
      setIsSuperAdmin(roleToEdit.role === "Super Admin");
    }
  }, [id, roles]);

  const handleSave = () => {
    setRoles((prevRoles) =>
      prevRoles.map((r) =>
        r.id === parseInt(id) ? { ...r, name, role } : r
      )
    );
    navigate("/roles&permission");
  };

  const handleCancel = () => {
    navigate("/roles&permission");
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setIsSuperAdmin(e.target.value === "Super Admin");
  };

  return (
    <div className="flex h-screen bg-[#F9F4F4] flex-col">
      <Header
        pageName="Edit Roles & Permission"
        databaseName="Database / List Roles & Permission / Edit Roles & Permission"
        notifications={0}
      />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
          {/* Header with Back and Save buttons */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Roles & Permission</h2>
            <div className="flex space-x-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
              >
                Back
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>

          {/* Form for editing role */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Role Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter role name"
                required
              />
            </div>

            {/* Super Admin option */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Super Admin</label>
              <div className="w-3/4 flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="superadmin"
                    checked={isSuperAdmin}
                    onChange={() => setIsSuperAdmin(true)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="superadmin"
                    checked={!isSuperAdmin}
                    onChange={() => setIsSuperAdmin(false)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissionEdit;
