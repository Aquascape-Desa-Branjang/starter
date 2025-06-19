import React from "react";
import CardProduk from "../../component/cardproduk";
import dummyproduk from "../../gambar/dummyproduk.png";
import headerImg from "../../gambar/header.jpg";

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
    <main className="bg-[#0a1d2b] text-white min-h-screen pb-12 xl:pb-24">
      
      {/* Gambar Header dengan Overlay dan Teks */}
      <div className="relative w-full h-full">
        <div className="relative overflow-hidden w-full h-auto max-h-96">
          <img
            src={headerImg}
            alt="Header"
            className="w-full h-full object-cover bg-no-repeat object-center"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-35 pointer-events-none" />
        </div>
        {/* Overlay hitam semi-transparan */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="p-6 md:p-10 lg:p-14 text-left xl:ps-28">
            <p className="text-white text-lg md:text-2xl font-bold">Selamat Datang di</p>
            <h1 className="text-[#5EEAD4] text-2xl md:text-5xl font-bold">
              Anto Aquarium & Art
            </h1>
          </div>
        </div>
      </div>
      
      {/* Tentang Kami */}
      <section id="tentang" className="text-center xl:pt-24 xl:pb-12 xl:px-28 pt-12 pb-6 px-4">
        <div className="flex flex-col items-center justify-center gap-3 xl:gap-4 mb-8 xl:mb-12">
          <h2 className="text-4xl xl:text-6xl text-default-text leading-none font-bold font-zilla-slab">Tentang Kami</h2>

          <p className="text-sm xl:text-lg leading-tight font-normal text-default-text mx-auto">
            Menghadirkan keindahan alam bawah air ke dalam ruangan, melalui seni aquascape yang memikat dan menenangkan.
          </p>
        </div>

        <div className="max-w-md xl:max-w-xl mx-auto mb-7 xl:mb-8">
          <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden relative">
            <iframe
              src="https://drive.google.com/file/d/1w2QaBklme6rxoKxR7hwed5O4AdFxnynp/preview"
              title="Google Drive Embed"
              allow="autoplay"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>

        <a
          href="/tentang"
          className="inline-block bg-[#66DDAA] text-[#0a1d2c] font-semibold w-full xl:w-80 px-5 py-3 rounded-full hover:brightness-90 transition"
        >
          Kenali kami lebih dekat →
        </a>
      </section>

      {/* Produk Unggulan */}
      <section className="px-4 xl:pt-12 xl:px-24 pt-6">
        <div className="flex flex-col items-center justify-center gap-3 xl:gap-4 mb-8">
          <h2 className="text-4xl xl:text-6xl text-default-text leading-none font-bold font-zilla-slab">Produk Unggulan</h2>

          <p className="text-sm xl:text-lg leading-tight font-normal text-default-text mx-auto">
            Karya terbaik yang menghidupkan ruang dan jiwa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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

      <div className="w-full text-center mt-7 px-4">
        <a
          href="/produk"
          className="inline-block bg-[#66DDAA] text-[#0a1d2c] font-semibold w-full xl:w-80 px-5 py-3 rounded-full hover:brightness-90 transition"
        >
          Lihat Semua Produk →
        </a>
      </div>
    </main>
  );
}
