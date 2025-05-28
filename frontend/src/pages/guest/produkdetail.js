import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import dummyproduk from "../../gambar/dummyproduk.png";
import CardProduk from "../../component/cardproduk";
import { FaShoppingBag } from "react-icons/fa";

export default function ProdukDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const produkList = [
    {
      id: "1",
      gambar: dummyproduk,
      nama: "Pot Dunia Bawah Air",
      harga: "Rp. 100.000",
      deskripsi: `As an avid indoor gardener, pruning is an essential process to keep your potted plants healthy and aesthetically pleasing. 
      Pruning potted plants helps adjust their form, control growth rate, stimulate new growth, and increase plant longevity. 
      To successfully prune your potted plants, it is important to understand the plant characteristics, pruning objectives, and techniques.`,
      detailLain: `This article will introduce some common pruning techniques for potted plants and how to prune based on the nature and growth stage of the plants.`,
    },
    {
      id: "2",
      gambar: dummyproduk,
      nama: "Tong Dunia Bawah Laut",
      harga: "Rp. 120.000",
      deskripsi: "Unik dan artistik, cocok untuk tema laut.",
      detailLain: "Dari limbah plastik, ramah lingkungan.",
    },
    {
      id: "3",
      gambar: dummyproduk,
      nama: "Tong Dunia Bawah Laut (Mini)",
      harga: "Rp. 90.000",
      deskripsi: "Versi mini, cocok untuk anak-anak.",
      detailLain: "Ukuran kecil, ringan dan praktis.",
    },
    {
      id: "4",
      gambar: dummyproduk,
      nama: "Tong Dunia Bawah Laut (Glow)",
      harga: "Rp. 130.000",
      deskripsi: "Terdapat efek glow in the dark.",
      detailLain: "Material unik dan menyala.",
    },
  ];

  const produk = produkList.find((p) => p.id === id);
  const produkSerupa = produkList.filter((p) => p.id !== id);

  if (!produk) {
    return (
      <div className="min-h-screen bg-[#0a1d2c] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold mb-4">Produk Tidak Ditemukan</h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a1d2c] text-white p-4">
      <h1 className="text-2xl font-bold mb-1">{produk.nama}</h1>
      <p className="text-sm text-gray-400 mb-4">Limbah Plastik</p>

      <img
        src={produk.gambar}
        alt={produk.nama}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <p className="text-sm leading-relaxed mb-4 whitespace-pre-line">
        {produk.deskripsi}
      </p>
      <p className="text-sm text-gray-300 mb-6">{produk.detailLain}</p>

      <div className="bg-white text-[#0a1d2c] rounded-lg p-4 text-sm space-y-1 mb-6">
        <p><strong>Harga:</strong> {produk.harga}</p>
        <p><strong>Harga Grosir:</strong></p>
        <p>- Rp. 1.000.000 (min. 10 pcs)</p>
        <p>- Rp. 4.000.000 (min. 40 pcs)</p>
        <p>- Rp. 10.000.000 (min. 100 pcs)</p>
        <button
          onClick={() => alert(`Beli ${produk.nama}`)}
          className="mt-4 bg-[#66DDAA] text-[#0a1d2c] font-semibold px-5 py-3 rounded-full transition w-full text-center flex items-center justify-center gap-2"
        >
          Beli di Shopee <FaShoppingBag/>
        </button>
      </div>

      {/* Produk Serupa */}
      <section className="px-4">
        <h2 className="text-2xl font-bold text-left mb-4">Produk Serupa</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {produkSerupa.map((item) => (
            <CardProduk
              key={item.id}
              id={item.id}
              gambar={item.gambar}
              nama={item.nama}
              harga={item.harga}
              detail="Lihat detail"
              onBeli={() => alert(`Beli ${item.nama}`)}
            />
          ))}
        </div>
      </section>

      <div className="w-full text-center mt-8">
        <a
          href="/guest/produk"
          className="inline-block bg-[#66DDAA] hover:bg-[#57c49b] text-[#0a1d2c] font-semibold px-5 py-2 w-80 rounded-full transition duration-200 text-center shadow-md"
        >
          Lihat Semua Produk →
        </a>
      </div>

    </main>
  );
}
