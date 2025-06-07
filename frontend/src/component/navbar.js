import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      setVisible(true);
      setClosing(false);
    } else if (visible) {
      setClosing(true);
      timeoutId = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, 400); // durasi animasi slide keluar
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen, visible]); // <- dependency lengkap, tidak akan warning

  return (
    <>
      {visible && (
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
            closing ? "opacity-0" : "opacity-100"
          }`}
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-screen w-[220px] bg-[#0B1320] text-white shadow-lg transform transition-transform duration-400 ease-in-out
          ${isOpen && !closing ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Tombol Close */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white text-4xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-6 space-y-6 font-semibold">
          <Link to="/" className="block hover:text-cyan-300" onClick={onClose}>
            Beranda
          </Link>
          <Link to="/tentang" className="block hover:text-cyan-300" onClick={onClose}>
            Tentang
          </Link>
          <Link to="/produk" className="block hover:text-cyan-300" onClick={onClose}>
            Produk
          </Link>
          {/* <Link to="/berita" className="block hover:text-cyan-300" onClick={onClose}>
            Berita
          </Link> */}
          <Link to="https://wa.me/+6281575576328" target="_blank" className="group hover:text-cyan-300 flex flex-row gap-2 items-center" onClick={onClose}>
            Kontak

            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="stroke-white group-hover:stroke-cyan-300" d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
