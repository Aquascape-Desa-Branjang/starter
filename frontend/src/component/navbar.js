import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../ikon/icon.png";
import profile from "../ikon/profile.png";
import dashboard from "../ikon/halaman/dashboard.png";
import monitoring from "../ikon/halaman/monitoring.png";
import plts from "../ikon/halaman/plts.png";
import sensor from "../ikon/halaman/sensor.png";
import usermanagement from "../ikon/halaman/usermanagement.png";
import logout from "../ikon/logout.png";

const Navbar = () => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

  // Toggle the submenu visibility for User Management
  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  return (
    <div className="w-[300px] h-screen bg-[#055E6E] text-white flex flex-col sticky top-0">
      {/* ======================== Profile Section ======================== */}
      <div className="flex items-center py-6 px-4 border-b border-gray-700">
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 rounded-full bg-gray-300 mr-4"
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold">Admin</h2>
          <div className="flex items-center justify-center mt-3">
            <img
              src={profile}
              alt="John Doe"
              className="w-16 h-16 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-lg font-bold">John Doe</h3>
              <p className="text-sm text-gray-300">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================== Navigation Menu ======================== */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <ul className="space-y-4">
          {/* Dashboard Menu */}
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <img src={dashboard} alt="Dashboard" className="w-5 h-5" />
              <span className="font-bold">Dashboard</span>
            </Link>
          </li>

          {/* Monitoring Menu */}
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/monitoring" className="flex items-center space-x-3">
              <img src={monitoring} alt="Monitoring" className="w-5 h-5" />
              <span className="font-bold">Monitoring</span>
            </Link>
          </li>

          {/* PLTS Menu */}
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/plts" className="flex items-center space-x-3">
              <img src={plts} alt="PLTS" className="w-5 h-5" />
              <span className="font-bold">PLTS</span>
            </Link>
          </li>

          {/* Sensors Menu */}
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/sensor&parameter" className="flex items-center space-x-3">
              <img src={sensor} alt="SensorParameter" className="w-5 h-5" />
              <span className="font-bold">Sensors & Parameters</span>
            </Link>
          </li>

          {/* Admin Portal Section */}
          <li className="text-gray-400 text-sm mt-6 uppercase tracking-wide">Admin Portal</li>

          {/* User Management Menu */}
          <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer" onClick={toggleUserManagement}>
            <div className="flex items-center space-x-3">
              <img src={usermanagement} alt="User Management" className="w-5 h-5" />
              <span className="font-bold">User Management</span>
            </div>
          </li>

          {/* Submenus under User Management */}
          {isUserManagementOpen && (
            <ul className="ml-8 space-y-2">
              <li className="hover:bg-green-700 p-2 rounded-md cursor-pointer">
                <Link to="/user&admin" className="flex items-center space-x-3">
                  <span className="font-bold">User Admin</span>
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </nav>

      {/* ======================== Logout Section ======================== */}
      <div className="px-4 py-4 border-t border-gray-700">
        <Link to="/logout" className="flex items-center space-x-4 hover:bg-green-700 p-2 rounded-md cursor-pointer">
          <img src={logout} alt="Logout" className="w-5 h-5" />
          <span className="font-bold">Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
