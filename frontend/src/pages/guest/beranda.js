import React from "react";
import CardProduk from "../../component/cardproduk";
import dummyproduk from "../../gambar/dummyproduk.png";
import headerImg from "../../gambar/header.png";

export default function Beranda() {
  const produk = [
    {
      id: 1,
      gambar: dummyproduk,
      nama: "Pot Dunia Bawah Air",
      harga: "Rp. 10.000",
      detail: "Lihat detail",
    },
    {
      id: 2,
      gambar: dummyproduk,
      nama: "Pot Dunia Bawah Air",
      harga: "Rp. 10.000",
      detail: "Lihat detail",
    },
    {
      id: 3,
      gambar: dummyproduk,
      nama: "Pot Dunia Bawah Air",
      harga: "Rp. 10.000",
      detail: "Lihat detail",
    },
    {
      id: 4,
      gambar: dummyproduk,
      nama: "Pot Dunia Bawah Air",
      harga: "Rp. 10.000",
      detail: "Lihat detail",
    },
  ];

  return (
    <main className="bg-[#0a1d2c] text-white min-h-screen pb-8">
      
      {/* Gambar Header dengan Overlay dan Teks */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={headerImg}
          alt="Header"
          className="w-full h-full object-cover"
        />
        {/* Overlay hitam semi-transparan */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="p-6 md:p-10 lg:p-14 text-left">
            <p className="text-white text-lg md:text-2xl font-bold">Selamat Datang di</p>
            <h1 className="text-[#5EEAD4] text-2xl md:text-5xl font-bold">
              Anto Aquarium & Art
            </h1>
          </div>
        </div>
      </div>
      
      {/* Tentang Kami */}
      <section id="tentang" className="text-center py-5 px-4">
        <h2 className="text-2xl font-bold mb-2">Tentang Kami</h2>
        <p className="text-gray-300 max-w-md mx-auto mb-6">
          Menghadirkan keindahan alam bawah air ke dalam ruangan, melalui seni aquascape yang memikat dan menenangkan.
        </p>
        <div className="max-w-md mx-auto mb-6">
          <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden relative">
            <img
              src="https://via.placeholder.com/640x360"
              alt="Video Thumbnail"
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center" aria-label="Play video">
              <div className="bg-white text-green-500 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                ▶
              </div>
            </button>
          </div>
        </div>
        <button
          onClick={() => alert("Kenali lebih dekat")}
          className="inline-block bg-[#66DDAA] text-[#0a1d2c] font-semibold px-5 py-2 w-80 rounded-full hover:bg-green-500 transition"
        >
          Kenali kami lebih dekat →
        </button>
      </section>

      {/* Produk Unggulan */}
      <section className="px-4">
        <h2 className="text-2xl font-bold text-center mb-1">Produk Unggulan</h2>
        <p className="text-center text-gray-300 mb-6">
          Karya terbaik yang menghidupkan ruang dan jiwa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {produk.map((item) => (
            <CardProduk
              key={item.id}
              id={item.id}
              gambar={item.gambar}
              nama={item.nama}
              harga={item.harga}
              detail={item.detail}
              onBeli={() => alert(`Beli ${item.nama}`)}
            />
          ))}
        </div>

      </section>

      <div className="w-full text-center mt-8">
        <a
          href="/produk"
          className="inline-block bg-[#66DDAA] hover:bg-[#57c49b] text-[#0a1d2c] font-semibold px-5 py-2 w-80 rounded-full transition duration-200 text-center shadow-md"          >
            Lihat Semua Produk →
        </a>
      </div>
    </main>
  );
}
