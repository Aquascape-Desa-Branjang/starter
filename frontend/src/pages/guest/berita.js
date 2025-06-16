import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CardBerita from "../../component/cardberita";
import headerImg from "../../gambar/header1.jpg";
import dummyImage from "../../gambar/dummyberita.png";

export default function Berita() {
  const semuaBerita = [
    {
      id: 1,
      gambar: dummyImage,
      judul: "Keindahan Dunia Bawah Air",
      cuplikan: "Dunia bawah laut menyimpan sejuta pesona yang dapat dijadikan inspirasi dekorasi rumah.",
    },
    {
      id: 2,
      gambar: dummyImage,
      judul: "Pot Karakter untuk Tanaman Mini",
      cuplikan: "Pot karakter menjadi pilihan menarik bagi pecinta tanaman mini di ruang sempit.",
    },
    {
      id: 3,
      gambar: dummyImage,
      judul: "Dekorasi Alam di Meja Kerja",
      cuplikan: "Menambahkan dekorasi bertema laut dapat memberikan nuansa segar pada ruang kerja Anda.",
    },
    {
      id: 4,
      gambar: dummyImage,
      judul: "Inspirasi Akuarium Estetik",
      cuplikan: "Berbagai jenis hiasan bawah laut menjadikan akuarium lebih hidup dan menarik.",
    },
    {
      id: 5,
      gambar: dummyImage,
      judul: "Keindahan Dunia Bawah Air Laut",
      cuplikan: "Dunia bawah laut menyimpan sejuta pesona yang dapat dijadikan inspirasi dekorasi rumah.",
    },
    {
      id: 6,
      gambar: dummyImage,
      judul: "Pot Karakter untuk Tanaman Mini Indonesia",
      cuplikan: "Pot karakter menjadi pilihan menarik bagi pecinta tanaman mini di ruang sempit.",
    },
    {
      id: 7,
      gambar: dummyImage,
      judul: "Dekorasi Alam di Meja Kerja Bos",
      cuplikan: "Menambahkan dekorasi bertema laut dapat memberikan nuansa segar pada ruang kerja Anda.",
    },
    {
      id: 8,
      gambar: dummyImage,
      judul: "Inspirasi Akuarium Estetik Banget",
      cuplikan: "Berbagai jenis hiasan bawah laut menjadikan akuarium lebih hidup dan menarik.",
    },
  ];

  const [halaman, setHalaman] = useState(1);
  const itemPerHalaman = 4;

  const totalHalaman = Math.ceil(semuaBerita.length / itemPerHalaman);
  const mulai = (halaman - 1) * itemPerHalaman;
  const beritaDitampilkan = semuaBerita.slice(mulai, mulai + itemPerHalaman);

  return (
    <main className="bg-[#0a1d2c] text-white min-h-screen">
      {/* Header */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <img src={headerImg} alt="Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="text-center p-6 md:p-10 lg:p-14">
            <p className="text-[#5EEAD4] text-2xl md:text-5xl font-bold">Berita Kami</p>
            <h1 className="text-white text-lg md:text-2xl mt-2 font-bold">
              Ragam cerita dan inspirasi seputar dunia bawah air
            </h1>
          </div>
        </div>
      </div>

      {/* Daftar Berita */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {beritaDitampilkan.length > 0 ? (
          beritaDitampilkan.map((item) => (
            <CardBerita key={item.id} {...item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-300">Berita tidak ditemukan.</p>
        )}
      </div>

      {/* Navigasi Halaman */}
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
