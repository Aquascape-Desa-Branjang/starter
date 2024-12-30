import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../ikon/icon.png";
import profile from "../ikon/profile.png";
import dashboard from "../ikon/halaman/dashboard.png";
import monitoring from "../ikon/halaman/monitoring.png";
import plts from "../ikon/halaman/plts.png";
import sensor from "../ikon/halaman/sensor.png";
import usermanagement from "../ikon/halaman/usermanagement.png";
import modulemanagement from "../ikon/halaman/modulemanagement.png";
import logout from "../ikon/logout.png";

const Navbar = () => {
  return (
    <div className="w-[300px] h-screen bg-[#055E6E] text-white flex flex-col sticky top-0">
      {/* ======================== Profile Section ======================== */}
      <div className="flex items-center py-6">
        <img
          src={logo}
          alt="Profile Icon"
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
      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="space-y-2">
          {/* Dashboard Menu */}
          <li className="flex items-center space-x-3 hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <img src={dashboard} alt="Dashboard" className="w-5 h-5" />
              <span className="font-bold">Dashboard</span>
            </Link>
          </li>
          {/* Monitoring Menu */}
          <li className="flex items-center space-x-3 hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/monitoring">
              <img src={monitoring} alt="Monitoring" className="w-5 h-5" />
              <span className="font-bold">Monitoring</span>
            </Link>
          </li>

          {/* PLTS Menu */}
          <li className="flex items-center space-x-3 hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/plts">
              <img src={plts} alt="PLTS" className="w-5 h-5" />
              <span className="font-bold">PLTS</span>
            </Link>
          </li>

          {/* Sensors Menu */}
          <li className="flex items-center space-x-3 hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <Link to="/sensor&parameter">  
              <img src={sensor} alt="SensorParameter" className="w-5 h-5" />
              <span className="font-bold">Sensors & Parameters</span>
            </Link>
          </li>

          {/* Admin Portal Section */}
          <li className="text-gray-400 text-sm mt-4 uppercase tracking-wide">Admin Portal</li>

          {/* User Management Menu */}
          <li className="flex items-center space-x-3 hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <img src={usermanagement} alt="User Management" className="w-5 h-5" />
            <span className="font-bold">User Management</span>
          </li>

          {/* Submenus under User Management */}
          <ul className="ml-8 space-y-2">
            {/* User Admin Menu */}
            <li className="flex items-center space-x-3 hover:bg-green-700 p-2 rounded-md cursor-pointer">
              <span className="font-bold">User Admin</span>
            </li>
            {/* Roles & Permission Menu */}
            <li className="flex items-center space-x-3 hover:bg-green-700 p-2 rounded-md cursor-pointer">
              <span className="font-bold">Roles & Permission</span>
            </li>
          </ul>

          {/* Module Management Menu */}
          <li className="flex items-center space-x-3 hover:bg-green-700 p-2 rounded-md cursor-pointer">
            <img src={modulemanagement} alt="Module Management" className="w-5 h-5" />
            <span className="font-bold">Module Management</span>
          </li>
        </ul>
      </nav>

      {/* ======================== Logout Section ======================== */}
      <div className="px-4 py-4">
        <div className="flex items-center space-x-3 hover:bg-green-700 p-2 rounded-md cursor-pointer">
          <img src={logout} alt="Logout" className="w-5 h-5" />
          <span className="font-bold">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
