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
          <Link to="/#tentang" className="block hover:text-cyan-300" onClick={onClose}>
            Tentang
          </Link>
          <Link to="/guest/produk" className="block hover:text-cyan-300" onClick={onClose}>
            Produk
          </Link>
          <Link to="/guest/berita" className="block hover:text-cyan-300" onClick={onClose}>
            Berita
          </Link>
          <Link to="/footer" className="block hover:text-cyan-300" onClick={onClose}>
            Kontak
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
