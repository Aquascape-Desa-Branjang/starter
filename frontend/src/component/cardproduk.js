import React from "react";
import { Link } from "react-router-dom";

export default function CardProduk({ id, gambar, nama, harga, detail, onBeli }) {
  return (
    <div className="bg-[#112e42] w-full p-4 rounded-xl shadow-lg flex flex-col items-start sm:max-w-md mx-auto">
      <img
        src={gambar}
        alt={nama}
        className="w-full h-52 object-cover rounded-lg"
      />
      <h3 className="mt-4 text-xl font-semibold text-white">{nama}</h3>
      <p className="text-base text-gray-300">{harga}</p>
      <Link
        to={`/guest/produkdetail/${id}`}
        className="text-sm text-green-400 hover:underline mt-1"
      >
        {detail}
      </Link>
      <button
        onClick={onBeli}
        className="mt-4 bg-[#66DDAA] text-[#0a1d2c] font-semibold px-5 py-2 rounded-full hover:bg-green-500 transition w-full text-center"
      >
        Beli di Shopee 🛒
      </button>
    </div>
  );
}
