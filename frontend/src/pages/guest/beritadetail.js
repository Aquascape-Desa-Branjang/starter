import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dummyImg from "../../gambar/dummyberita.png";
import CardBerita from "../../component/cardberita";

export default function BeritaDetail() {
  const { id } = useParams();
  const [semuaBerita, setSemuaBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  
      
  useEffect(() => {
    document.title = "Antoaquarium | Berita";

    axios
      .get("https://admin.antoaquarium.my.id/api/articles")
      .then((response) => {
        const apiData = response.data.data;

        const mappedBerita = apiData.map((item) => ({
          id: item.id,
          gambar: `https://admin.antoaquarium.my.id/storage/${item.image}`,
          judul: item.title,
          cuplikan: item.description,
          slug: item.slug,
        }));

        setSemuaBerita(mappedBerita);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
      const dummyName = berita.judul;
      document.title = "Antoaquarium | " + dummyName;
  }, []);
  

  const berita = semuaBerita.find((b) => b.id === id);
  const beritaLain = semuaBerita.filter((b) => b.id !== id);
  

  if (!berita) {
    return (
      <div className="min-h-screen bg-[#0a1d2c] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold mb-4">Berita Tidak Ditemukan</h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a1d2c] text-white p-4">
      <h1 className="text-2xl font-bold mb-1">{berita.judul}</h1>
      <p className="text-sm text-gray-400 mb-4">Kategori: Berita Terkini</p>

      {/* Gambar Berita Utama - diubah agar tidak terpotong */}
      <img
        src={berita.gambar}
        alt={berita.judul}
        className="w-full max-h-[70vh] object-contain rounded-lg mb-4"
      />

      <div className="text-sm leading-relaxed mb-4 whitespace-pre-line">
        {berita.isi}
      </div>
      <p className="text-sm text-gray-300 mb-6">{berita.detailLain}</p>

      {/* Berita Lainnya */}
      <section className="px-4">
        <h2 className="text-2xl font-bold text-left mb-4">Berita Lainnya</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beritaLain.map((item) => (
            <CardBerita
              key={item.id}
              id={item.id}
              gambar={item.gambar}
              judul={item.judul}
              cuplikan={item.isi.slice(0, 100) + "..."}
            />
          ))}
        </div>
      </section>

      <div className="w-full text-center mt-8">
        <a
          href="/guest/berita"
          className="inline-block bg-[#66DDAA] hover:bg-[#57c49b] text-[#0a1d2c] font-semibold px-5 py-2 w-80 rounded-full transition duration-200 text-center shadow-md"
        >
          Lihat Semua Berita →
        </a>
      </div>
    </main>
  );
}
