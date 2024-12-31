import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../component/header";
import showicon from "../ikon/show.png"; // Ikon untuk "Show Password"
import hideicon from "../ikon/hide.png"; // Ikon untuk "Hide Password"

// Dummy data for users
const usersData = [
  { id: 1, name: "John Doe", email: "portal@admin.com", role: "Super Admin", status: "Active", profile: null, password: "admin123" },
  { id: 2, name: "Jane Smith", email: "jane@admin.com", role: "Admin", status: "Inactive", profile: null, password: "password123" },
];

const EditUserAdmin = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();

  // State
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");
  const [password, setPassword] = useState(""); // Password bisa kosong jika tidak diubah
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  useEffect(() => {
    // Fetch user data by ID
    const user = usersData.find((user) => user.id === parseInt(id));
    if (user) {
      setPhoto(user.profile || null);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
      setPassword(user.password); // Load existing password
    }
  }, [id]);

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Updated:", { id, photo, name, email, role, status, password });
    navigate("/user&admin"); // Redirect back to the list
  };

  const handleBack = () => {
    navigate("/user&admin");
  };

  return (
    <div className="flex h-screen bg-[#F9F4F4] flex-col">
      <Header pageName="Edit Users Admin" databaseName="Database / List Users Admin / Edit Users Admin" notifications={0} />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Users Admin</h2>
            <div className="flex space-x-4">
              <button
                onClick={handleBack}
                className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Photo Input */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Photo</label>
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-black">
                  {photo ? (
                    <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Name Input */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Email"
                required
              />
            </div>

            {/* Role Input */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>

            {/* Status Input */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Status</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Active"
                    checked={status === "Active"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-4 w-4"
                  />
                  <span>Active</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Non Active"
                    checked={status === "Non Active"}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-4 w-4"
                  />
                  <span>Non Active</span>
                </label>
              </div>
            </div>

            {/* Password Input */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Password</label>
              <div className="w-3/4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-4 py-1 border border-gray-300 rounded-lg"
                  placeholder="Enter New Password (optional)"
                />
                <img
                  src={showPassword ? showicon : hideicon}
                  alt="Toggle Password Visibility"
                  onClick={toggleShowPassword}
                  className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserAdmin;
