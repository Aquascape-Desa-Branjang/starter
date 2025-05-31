import React, { useState } from "react";

const ProdukSettings = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#162232] text-white p-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-2">
        Pengaturan &gt; <span className="text-white">Produk</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Produk</h1>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded flex items-center gap-1 text-sm">
          ✎ Ubah
        </button>
        <a href="/admin/pengaturanberanda" className="text-white">
            Pengaturan Beranda
        </a>
      </div>

      {/* Bagian 1 */}
      <section className="bg-[#1e2a3a] p-4 rounded-xl mb-4">
        <h2 className="font-semibold mb-3 border-b border-gray-600 pb-2">Bagian 1</h2>

        <div className="mb-3">
          <label className="block text-sm mb-1">Judul</label>
          <input type="text" placeholder="Masukkan Judul" className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400" />
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Sub Judul</label>
          <input type="text" placeholder="Masukkan Sub Judul" className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400" />
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-green-500 file:text-white
              hover:file:bg-green-600"
          />
          {selectedImage && (
            <div className="mt-3">
              <img src={selectedImage} alt="Preview" className="max-w-xs rounded-md border border-gray-500" />
            </div>
          )}
        </div>

        <div className="mb-3 bg-[#2b3b4e] p-3 rounded-md border border-gray-500">
          <label className="block text-sm mb-1">Tombol</label>
          <input type="text" placeholder="Masukkan Nama Tombol" className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400" />
        </div>
      </section>

      {/* Utama */}
      <section className="bg-[#1e2a3a] p-4 rounded-xl mb-4">
        <h2 className="font-semibold mb-3 border-b border-gray-600 pb-2">Utama</h2>

        <div className="mb-3">
          <label className="block text-sm mb-1">Judul Filter Default</label>
          <input type="text" placeholder="Masukkan Judul Filter" className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400" />
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Maksimal Konten Per Halaman</label>
          <input type="text" placeholder="Masukkan Jumlah Maksimal Konten" className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400" />
        </div>
      </section>

      {/* Detail */}
      <section className="bg-[#1e2a3a] p-4 rounded-xl mb-4">
        <h2 className="font-semibold mb-3 border-b border-gray-600 pb-2">Detail</h2>

        <div className="mb-3">
          <label className="block text-sm mb-1">Maksimal Konten yang Tampil (Produk Serupa)</label>
          <input type="text" placeholder="Masukkan Maksimal Konten Tampil" className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400" />
        </div>
      </section>
    </div>
  );
};

export default ProdukSettings;
