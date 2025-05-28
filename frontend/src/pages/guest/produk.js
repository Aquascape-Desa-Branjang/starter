import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CardProduk from "../../component/cardproduk";
import {handleDownloadPDF} from "../../component/ecatalog";
import dummyproduk from "../../gambar/dummyproduk.png";
import headerImg from "../../gambar/header1.jpg";

export default function Produk() {
  const semuaProduk = [
    {
      id: 1,
      kategori: "Pot",
      gambar: dummyproduk,
      nama: "Pot Dunia Bawah Air",
      harga: "Rp. 10.000",
      detail: "Lihat detail",
    },
    {
      id: 2,
      kategori: "Aksesoris",
      gambar: dummyproduk,
      nama: "Hiasan Karang Laut",
      harga: "Rp. 15.000",
      detail: "Lihat detail",
    },
    {
      id: 3,
      kategori: "Pot",
      gambar: dummyproduk,
      nama: "Pot Mini Karakter",
      harga: "Rp. 12.000",
      detail: "Lihat detail",
    },
    {
      id: 4,
      kategori: "Dekorasi",
      gambar: dummyproduk,
      nama: "Rumah Siput Dekoratif",
      harga: "Rp. 18.000",
      detail: "Lihat detail",
    },
    {
      id: 5,
      kategori: "Pot",
      gambar: dummyproduk,
      nama: "Pot Dunia Bawah Air",
      harga: "Rp. 10.000",
      detail: "Lihat detail",
    },
    {
      id: 6,
      kategori: "Aksesoris",
      gambar: dummyproduk,
      nama: "Hiasan Karang Laut",
      harga: "Rp. 15.000",
      detail: "Lihat detail",
    },
    {
      id: 7,
      kategori: "Pot",
      gambar: dummyproduk,
      nama: "Pot Mini Karakter",
      harga: "Rp. 12.000",
      detail: "Lihat detail",
    },
    {
      id: 8,
      kategori: "Dekorasi",
      gambar: dummyproduk,
      nama: "Rumah Siput Dekoratif Banget",
      harga: "Rp. 18.000",
      detail: "Lihat detail",
    },
  ];

  const [kategori, setKategori] = useState("");
  const [cariNama] = useState("");
  const [halaman, setHalaman] = useState(1);
  const itemPerHalaman = 4;

  const produkTersaring = semuaProduk.filter((item) => {
    return (
      (kategori === "" || item.kategori === kategori) &&
      item.nama.toLowerCase().includes(cariNama.toLowerCase())
    );
  });

  const totalHalaman = Math.ceil(produkTersaring.length / itemPerHalaman);
  const mulai = (halaman - 1) * itemPerHalaman;
  const produkDitampilkan = produkTersaring.slice(mulai, mulai + itemPerHalaman);

  return (
    <main className="bg-[#0a1d2c] text-white min-h-screen">
      {/* Header */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <img src={headerImg} alt="Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="text-center p-6 md:p-10 lg:p-14">
            <p className="text-[#5EEAD4] text-2xl md:text-5xl font-bold">Karya Kami</p>
            <h1 className="text-white text-lg md:text-2xl mt-2 font-bold">
              Beragam karya penuh warna, hadirkan kecantikan dunia bawah air mu
            </h1>
          </div>
        </div>
      </div>

      {/* Filter dan Tombol PDF */}
      <div className="p-6 flex flex-col gap-4 items-center">
        {/* Dropdown Filter */}
        <select
          className="px-4 py-3 w-full lg:w-1/3 bg-[#334155] text-white rounded-md border border-white focus:outline-none"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
          <option value="">Semua Ragam</option>
          <option value="Pot">Pot</option>
          <option value="Aksesoris">Aksesoris</option>
          <option value="Dekorasi">Dekorasi</option>
        </select>

        {/* Tombol Download PDF */}
        <button
          onClick={() => handleDownloadPDF(produkTersaring)}
          className="bg-[#66DDAA] hover:bg-green-600 px-6 py-3 rounded-full text-black text-sm font-semibold shadow-md transition"
        >
          Unduh Katalog PDF
        </button>
      </div>

      {/* Daftar Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {produkDitampilkan.length > 0 ? (
          produkDitampilkan.map((item) => (
            <CardProduk key={item.id} {...item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-300">Produk tidak ditemukan.</p>
        )}
      </div>

      {/* Tombol Navigasi */}
      <div className="flex justify-center gap-4 pb-8">
        <button
          onClick={() => setHalaman((prev) => Math.max(prev - 1, 1))}
          disabled={halaman === 1}
          className="w-40 flex items-center justify-center gap-2 px-5 py-2 bg-[#66DDAA] rounded-full text-[#0f172a] font-semibold hover:bg-[#5cd0a0] transition disabled:opacity-50"
        >
          <FaArrowLeft />
          Sebelumnya
        </button>

        <button
          onClick={() => setHalaman((prev) => Math.min(prev + 1, totalHalaman))}
          disabled={halaman === totalHalaman}
          className="w-40 flex items-center justify-center gap-2 px-5 py-2 bg-[#66DDAA] rounded-full text-[#0f172a] font-semibold hover:bg-[#5cd0a0] transition disabled:opacity-50"
        >
          Berikutnya
          <FaArrowRight />
        </button>
      </div>
    </main>
  );
}
