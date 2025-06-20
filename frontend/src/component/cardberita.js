// src/component/cardberita.js
import React from "react";
import { Link } from "react-router-dom";

export default function CardBerita({ id, gambar, judul, cuplikan, slug}) {
  return (
    <div className="bg-[#112e42] w-full p-4 rounded-xl shadow-lg flex flex-col items-start sm:max-w-md mx-auto">
      <img
        src={gambar}
        alt={judul}
        className="w-full h-52 object-cover rounded-lg"
      />
      <h3 className="mt-4 text-xl font-semibold text-white">{judul}</h3>
      <p className="text-base text-white mt-2 line-clamp-3">{cuplikan}</p>
      <Link
        to={`/beritadetail/${slug}`}
        className="mt-4 bg-[#66DDAA] text-[#0a1d2c] font-semibold px-5 py-3 rounded-full transition w-full text-center flex items-center justify-center gap-2"
      >
        Baca Selengkapnya
      </Link>
    </div>
  );
}
