import React, { useState } from "react";
import Navbar from "./navbar";
import logo from "../gambar/logo.png";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-[#0F172A] text-white shadow-md">
        <img src={logo} alt="Logo" className="w-21 h-14" />

        {/* Hamburger Button */}
        <button
          className="flex flex-col justify-center space-y-1 focus:outline-none transition-all duration-300"
          onClick={toggleSidebar}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </header>

      <Navbar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
};

export default Header;
