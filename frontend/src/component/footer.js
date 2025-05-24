import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import footerContent from "./footer.json";
import logo from "../gambar/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F172A] text-white text-sm pt-8 pb-6">
      <div className="px-4 sm:px-6 max-w-screen-xl mx-auto">
        
        {/* Kontak */}
        <div className="bg-[#182033] p-6 rounded-lg mb-6">
          <p className="text-lg font-semibold mb-3">Punya pertanyaan atau order? Hubungi kami</p>
          <div className="flex flex-col gap-2">
            <a href="https://instagram.com/anto.aquarium" className="flex items-center gap-2 text-white">
              <FaInstagram className="text-xl" /> anto.aquarium
            </a>
            <a href="https://wa.me/6285123456789" className="flex items-center gap-2 text-white">
              <FaWhatsapp className="text-xl" /> 085123456789
            </a>
          </div>
        </div>

        {/* Baris logo dan slogan sejajar */}
        <div className="flex items-center gap-4 mb-2">
          <img src={logo} alt="Logo" className="w-30 h-20" />
          <p className="text-white font-extrabold text-left text-bold">{footerContent.slogan}</p>
        </div>

        {/* Quote dan owner di bawah, full width */}
        <blockquote className="mt-3 text-white font-medium text-left mb-1">“{footerContent.quote}”</blockquote>
        <p className="mt-5 text-white font-medium text-left mb-6">— {footerContent.owner}</p>

        {/* Address dan Navigation */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          <div className="md:w-1/2 min-w-0">
            <h4 className="font-semibold  mb-2">Address</h4>
            <p className="text-gray-400" style={{ whiteSpace: "pre-line" }}>
              {footerContent.address}
            </p>
          </div>
          <div className="md:w-1/2 min-w-0">
            <h4 className="font-semibold mb-2">Navigation</h4>
            <ul className="text-gray-300 space-y-1">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#tentang" className="hover:underline">Tentang</a></li>
              <li><a href="/guest/produk" className="hover:underline">Produk</a></li>
              <li><a href="/guest/berita" className="hover:underline">Berita</a></li>
              <li><a href="#kontak" className="hover:underline">Kontak</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white pt-4 text-center text-xs text-white">
          Copyright © 2025. All Right Reserved. Anto Aquarium & Art
        </div>
      </div>
    </footer>
  );
};

export default Footer;
