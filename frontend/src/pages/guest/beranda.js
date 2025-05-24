import React from "react";
import CardProduk from "../../component/cardproduk";
import dummyproduk from "../../gambar/dummyproduk.png";

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
    <main className="bg-[#0a1d2c] text-white min-h-screen">
      {/* Tentang Kami */}
      <section className="text-center py-10 px-4">
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
          className="inline-block bg-green-400 text-[#0a1d2c] font-semibold px-6 py-2 rounded-full hover:bg-green-500 transition"
        >
          Kenali kami lebih dekat →
        </button>
      </section>

      {/* Produk Unggulan */}
      <section className="py-10 px-4">
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

        <div className="text-center mt-8">
          <button
            onClick={() => alert("Lihat semua produk")}
            className="inline-block bg-green-400 text-[#0a1d2c] font-semibold px-6 py-2 rounded-full hover:bg-green-500 transition"
          >
            Lihat Semua Produk →
          </button>
        </div>
      </section>
    </main>
  );
}
