import React from "react";
import { FaInstagram, FaWhatsapp, FaShoppingBag } from "react-icons/fa";
import footerContent from "./footer.json";
import logo from "../gambar/logo.png";
import footerImg from "../gambar/footer.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F172A] text-white text-sm pb-8">
      {/* Kontak & Gambar */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
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
                <FaShoppingBag className="text-xl" />
              </div>
              <a href="https://shopee.co.id/adiluhungbagas?uls_trackid=52t6u6or00c5&utm_content=3qK6mwic43ZSNJGhMqCjp7gSQNRM" >
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

      <div className="px-4 sm:px-6 pt-6 max-w-screen-xl mx-auto xl:max-w-full xl:m-0 xl:px-28 xl:pt-12">

        {/* Baris logo dan slogan sejajar */}
        <div className="flex items-center justify-between gap-9 mb-2">
          <img src={logo} alt="Logo" className="w-auto h-24 xl:h-28" />
          <p className="text-white font-medium text-left text-base xl:w-5/12 xl:text-3xl">{footerContent.slogan}</p>
        </div>

        <div className="grid grid-cols-3 justify-between gap-x-4 gap-y-7 mb-6 mt-4">
          {/* Quote dan owner di bawah, full width */}
          <div className="flex flex-col justify-center items-start gap-1 col-span-3 xl:col-span-1 text-sm font-normal xl:gap-6 xl:text-lg">
            <blockquote className="text-white leading-tight text-left">“{footerContent.quote}”</blockquote>
            <p className="text-white leading-tight text-left">— {footerContent.owner}</p>
          </div>

          {/* Address */}
          <div className="min-w-0 col-span-2 xl:col-span-1 xl:justify-self-end">
            <h4 className="font-light mb-2 font-zilla-slab text-default-text-secondary text-sm xl:text-lg">Address</h4>
            <p className="text-white text-base xl:text-xl" style={{ whiteSpace: "pre-line" }}>
              {footerContent.address}
            </p>
          </div>

          {/* Navigation */}
          <div className="min-w-0 col-span-1 xl:col-span-1 xl:justify-self-end pe-16">
            <h4 className="font-light mb-2 font-zilla-slab text-default-text-secondary text-sm xl:text-lg">Navigation</h4>
            <ul className="text-gray-300 space-y-1">
              <li><a href="#home" className="hover:underline font-normal text-base xl:text-xl">Home</a></li>
              <li><a href="#tentang" className="hover:underline font-normal text-base xl:text-xl">Tentang</a></li>
              <li><a href="/produk" className="hover:underline font-normal text-base xl:text-xl">Produk</a></li>
              <li><a href="/berita" className="hover:underline font-normal text-base xl:text-xl">Berita</a></li>
              <li><a href="#kontak" className="hover:underline font-normal text-base xl:text-xl">Kontak</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white pt-4 text-center text-xs xl:pt-6 xl:text-base text-white font-medium">
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
