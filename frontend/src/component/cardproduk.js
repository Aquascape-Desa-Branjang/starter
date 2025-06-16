import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

export default function CardProduk({ id, slug, gambar, nama, harga, onBeli }) {
  return (
    <div className="bg-[#112e42] w-full p-4 rounded-xl shadow-lg flex flex-col items-start sm:max-w-md mx-auto">
      <img
        src={gambar}
        alt={nama}
        className="w-full h-52 object-cover rounded-lg"
      />
      <h3 className="mt-4 text-xl font-semibold text-white">{nama}</h3>
      <p className="text-base text-white">Rp. {harga.toLocaleString("id-ID")}</p>
      <Link
        to={`/guest/produkdetail/${slug}`}
        className="text-sm text-white mt-1"
      >
        <p className="hover:underline text-base text-white">Lihat Detail</p>
      </Link>
        <button
          onClick={onBeli}
          className="mt-4 bg-[#66DDAA] text-[#0a1d2c] font-semibold px-5 py-3 rounded-full transition w-full text-center flex items-center justify-center gap-2"
        >
          Beli di Shopee
          <FaShoppingBag/>
        </button>
    </div>
  );
}
