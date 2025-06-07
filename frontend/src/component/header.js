import React, { useState } from "react";
import Navbar from "./navbar";
import NavbarDesktop from "./navbar-desktop";
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
      {/* Bagian atas header */}
      <header className="flex items-center justify-between sticky top-0 start-0 z-30 px-4 py-3 bg-[#0F172A] text-white shadow-md xl:px-28 xl:py-5">
        <img src={logo} alt="Logo" className="w-auto h-14" />

        {/* Hamburger Button */}
        <button
          className="flex flex-col justify-center space-y-1 focus:outline-none transition-all duration-300 xl:hidden"
          onClick={toggleSidebar}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* Navbar Desktop */}
        <NavbarDesktop className="hidden xl:flex" />
      </header>

      {/* Sidebar mobile */}
      <Navbar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
};

export default Header;
