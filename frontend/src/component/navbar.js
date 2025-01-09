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
      {/* ======================== Logo and Title Section ======================== */}              
      <div className="flex flex-col items-center py-2 px-4"> {/* Removed border-b here */}              
        <div className="flex items-center justify-center mb-2"> {/* Reduced margin here */}              
          <img              
            src={logo}              
            alt="Logo"              
            className="w-12 h-12 rounded-full bg-gray-300 mr-4"              
          />              
          <h2 className="text-2xl font-bold">Welcome</h2>              
        </div>              
      </div>              
        
      {/* ======================== Profile Section ======================== */}              
      <div className="flex flex-col items-start py-4 px-4">              
        {/* Profile Section Header */}              
        <div className="text-gray-400 text-sm uppercase tracking-wide">Profile</div>              
            
        <div className="flex items-center mt-2">              
          <img              
            src={profile}              
            alt="John Doe"              
            className="w-10 h-10 rounded-full"              
          />              
          <div className="ml-4 text-left">              
            <h3 className="text-lg font-bold">John Doe</h3>              
            <p className="text-sm text-gray-300">Super Admin</p>              
          </div>              
        </div>              
      </div>              
            
      {/* ======================== Navigation Menu ======================== */}              
      <nav className="flex-1 px-4 py-2 overflow-y-auto">              
        {/* Menu Section Header */}              
        <div className="text-gray-400 text-sm mt-4 uppercase tracking-wide">Menu</div> {/* Reduced margin-top here */}              
            
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
      <div className="px-4 py-2"> {/* Removed border-t here */}              
        <Link              
          to="/logout"              
          className="flex items-center justify-center hover:bg-green-700 p-2 rounded-md cursor-pointer"              
        >              
          <img src={logout} alt="Logout" className="w-5 h-5" />              
          <span className="font-bold ml-4">Log Out</span>              
        </Link>              
      </div>              
    </div>              
  );              
};              
            
export default Navbar;              
