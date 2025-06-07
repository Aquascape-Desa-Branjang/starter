import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import footerContent from "./footer.json";
import logo from "../gambar/logo.png";
import footerImg from "../gambar/footer.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F172A] text-white text-sm pt-8 pb-6">
      {/* Kontak & Gambar */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden mb-6">
        {/* Gambar latar belakang */}
        <img
          src={footerImg}
          alt="Footer"
          className="w-full h-full object-cover"
        />

        {/* Overlay & Konten */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-between px-6 md:px-20">
          {/* Teks di kiri */}
          <div className="text-white max-w-md">
            <p className="text-lg md:text-5xl font-medium leading-loose">
              Punya pertanyaan<br />
              atau order?<br />
              Hubungi kami
            </p>
          </div>

          {/* Kontak di kanan */}
          <div className="bg-[#2D3E59] bg-opacity-90 text-white p-3 md:p-6 rounded-xl w-fit space-y-3 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-[#C4F2DF] text-[#182033] rounded-full p-1">
                <FaInstagram className="text-xl" />
              </div>
              <a href="https://instagram.com/anto.aquarium_" >
                anto.aquarium_
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#C4F2DF] text-[#182033] rounded-full p-1">
                <img
                  src="https://www.svgrepo.com/show/504865/shopee.svg"
                  alt="Shopee Logo"
                  className="w-6 h-6"
                />
              </div>
              <a
                href="https://shopee.co.id/adiluhungbagas?uls_trackid=52t6u6or00c5&utm_content=3qK6mwic43ZSNJGhMqCjp7gSQNRM"
                target="_blank"
                rel="noopener noreferrer"
              >
                anto.aquarium_
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#C4F2DF] text-[#182033] rounded-full p-1">
                <FaWhatsapp className="text-xl" />
              </div>
              <a href="https://wa.me/+6281575576328">
                081575576328
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 max-w-screen-xl mx-auto">
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
            <h4 className="font-semibold mb-2">Address</h4>
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
          Copyright © 2025. All Right Reserved.{" "}
          <a href="/admin/loginnik" className="text-white">
            Anto Aquarium & Art
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
