import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CardBerita from "../../component/cardberita";
import headerImg from "../../gambar/header1.jpg";

export default function Berita() {
  const [semuaBerita, setSemuaBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [halaman, setHalaman] = useState(1);
  const itemPerHalaman = 4;

  useEffect(() => {
    document.title = "Antoaquarium | Berita";

    axios
      .get("https://admin.antoaquarium.my.id/api/article")
      .then((response) => {
        const apiData = response.data.data;

        const mappedBerita = apiData.map((item) => ({
          id: item.id,
          gambar: `https://admin.antoaquarium.my.id/storage/${item.image}`,
          nama: item.title,
          description: item.description,
          slug: item.slug,
        }));

        setSemuaBerita(mappedBerita);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalHalaman = Math.ceil(semuaBerita.length / itemPerHalaman);
  const mulai = (halaman - 1) * itemPerHalaman;
  const beritaDitampilkan = semuaBerita.slice(mulai, mulai + itemPerHalaman);

  return (
    <main className="bg-[#0a1d2c] text-white min-h-screen">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-300">Memuat berita...</p>
        ) : beritaDitampilkan.length > 0 ? (
          beritaDitampilkan.map((item) => (
            <CardBerita key={item.id} {...item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-300">Berita tidak ditemukan.</p>
        )}
      </div>

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
          disabled={halaman === totalHalaman || totalHalaman === 0}
          className="w-40 flex items-center justify-center gap-2 px-5 py-2 bg-[#66DDAA] rounded-full text-[#0f172a] font-semibold hover:bg-[#5cd0a0] transition disabled:opacity-50"
        >
          Berikutnya
          <FaArrowRight />
        </button>
      </div>
    </main>
  );
}
