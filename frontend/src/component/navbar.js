// Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../ikon/icon.png";
import defaultProfile from "../ikon/profile.png"; // Gambar default jika tidak ada foto profil
import dashboard from "../ikon/halaman/dashboard.png";
import monitoring from "../ikon/halaman/monitoring.png";
import plts from "../ikon/halaman/plts.png";
import usermanagement from "../ikon/halaman/usermanagement.png";
import logout from "../ikon/logout.png";
import {jwtDecode} from "jwt-decode"; // Perbaiki import

const Navbar = () => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("Guest"); // Default: Guest
  const [userName, setUserName] = useState("Guest"); // Default: Guest
  const [profileImage, setProfileImage] = useState(defaultProfile); // Default image

  // Ambil token dan data pengguna dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role || "User");
        setUserName(decodedToken.name || "Guest");

        const storedPhoto = decodedToken.photo; // Ambil dari token langsung
        if (storedPhoto) {
          setProfileImage(storedPhoto); // Simpan foto profil dari token
        } else {
          setProfileImage(defaultProfile); // Gunakan default jika tidak ada foto
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
        setUserRole("User");
        setUserName("Guest");
        setProfileImage(defaultProfile); // Gunakan default jika error
      }
    }
  }, []);

  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  const handleLogout = () => {
    localStorage.clear(); // Hapus semua data dari localStorage
    navigate("/"); // Redirect ke halaman login
  };

  return (
    <div className="w-[300px] h-screen bg-[#055E6E] text-white flex flex-col sticky top-0">
      {/* Header */}
      <div className="flex flex-col items-center py-2 px-4">
        <div className="flex items-center justify-center mb-2">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full bg-gray-300 mr-4"
          />
          <h2 className="text-2xl font-bold">Welcome</h2>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-start py-4 px-4">
        <div className="text-gray-400 text-sm uppercase tracking-wide">Profile</div>
        <div className="flex items-center mt-2">
          <img
            src={profileImage ? `data:image/png;base64,${profileImage}` : defaultProfile}
            alt={userName}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4 text-left">
            <h3 className="text-lg font-bold">{userName}</h3> {/* Tampilkan nama pengguna */}
            <p className="text-sm text-gray-300">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        <div className="text-gray-400 text-sm mt-4 uppercase tracking-wide">Menu</div>

        <ul className="space-y-4">
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <img src={dashboard} alt="Dashboard" className="w-5 h-5" />
              <span className="font-bold">Dashboard</span>
            </Link>
          </li>
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/monitoring" className="flex items-center space-x-3">
              <img src={monitoring} alt="Monitoring" className="w-5 h-5" />
              <span className="font-bold">Monitoring</span>
            </Link>
          </li>
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/plts" className="flex items-center space-x-3">
              <img src={plts} alt="PLTS" className="w-5 h-5" />
              <span className="font-bold">PLTS</span>
            </Link>
          </li>

          {userRole === "Admin" && (
            <>
              <li className="text-gray-400 text-sm mt-6 uppercase tracking-wide">Admin Portal</li>
              <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer" onClick={toggleUserManagement}>
                <div className="flex items-center space-x-3">
                  <img src={usermanagement} alt="User Management" className="w-5 h-5" />
                  <span className="font-bold">User Management</span>
                </div>
              </li>
              {isUserManagementOpen && (
                <ul className="ml-8 space-y-2">
                  <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
                    <Link to="/user&admin" className="flex items-center space-x-3">
                      <span className="font-bold">User Admin</span>
                    </Link>
                  </li>
                  <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
                    <Link to="/sensor&parameter" className="flex items-center space-x-3">
                      <span className="font-bold">Sensors & Parameters</span>
                    </Link>
                  </li>
                  <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
                    <Link to="/sensorlist" className="flex items-center space-x-3">
                      <span className="font-bold">Sensors</span>
                    </Link>
                  </li>
                  <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
                    <Link to="/dummydata" className="flex items-center space-x-3">
                      <span className="font-bold">Bikin dummy data</span>
                    </Link>
                  </li>
                </ul>
              )}
            </>
          )}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="px-4 py-2">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center hover:bg-green-700 p-2 rounded-md cursor-pointer w-full"
        >
          <img src={logout} alt="Logout" className="w-5 h-5" />
          <span className="font-bold ml-4">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
