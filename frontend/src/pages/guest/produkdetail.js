import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import dummyproduk from "../../gambar/dummyproduk.png";
import CardProduk from "../../component/cardproduk";

export default function ProdukDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [produk, setProduk] = useState(null);
  const [produkSerupa, setProdukSerupa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorProduk, setErrorProduk] = useState(null);

    useEffect(() => {
    axios
      .get("https://backend-aquascape.wibukoding.com/api/products", {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      })
      .then((response) => {
        const apiData = response.data.data;
        const semuaProduk = apiData.map((item) => ({
            id: item.id,
            slug: item.slug,
            gambar: item.image,
            nama: item.name,
            harga: item.retail_price,
            deskripsi: item.description,
          }))

        const produkUtama = semuaProduk.find((item) => item.slug.toString() === slug);

        console.log("data: "+semuaProduk[0].slug);
        console.log("slug: "+slug);
        const serupa = semuaProduk.filter((item) => item.slug.toString() !== slug);

        setProduk(produkUtama || null);
        setProdukSerupa(serupa);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorProduk("Gagal memuat data produk.");
        setLoading(false);
      });
  }, [slug, API_KEY]);

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
      {/* <p className="text-sm text-gray-300 mb-6">{produk.detailLain}</p> */}

      <div className="bg-white text-[#0a1d2c] rounded-lg p-4 text-sm space-y-1 mb-6">
        <p><strong>Harga:</strong> {produk.harga}</p>
        <p><strong>Harga Grosir:</strong></p>
        <p>- Rp. 1.000.000 (min. 10 pcs)</p>
        <p>- Rp. 4.000.000 (min. 40 pcs)</p>
        <p>- Rp. 10.000.000 (min. 100 pcs)</p>
        <a
          href="https://shopee.co.id/adiluhungbagas?uls_trackid=52t6u6or00c5&utm_content=3qK6mwic43ZSNJGhMqCjp7gSQNRM"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-[#66DDAA] text-[#0a1d2c] font-semibold px-5 py-3 rounded-full transition w-full text-center flex items-center justify-center gap-2"
        >
          Beli di Shopee
          <img
            src="https://www.svgrepo.com/show/504865/shopee.svg"
            alt="Shopee Logo"
            className="w-6 h-6"
          />
        </a>
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
