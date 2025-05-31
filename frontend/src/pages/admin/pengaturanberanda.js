import React from "react";

const BerandaSettings = () => {
  return (
    <div className="min-h-screen bg-[#162232] text-white p-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-2">
        Pengaturan &gt; <span className="text-white">Beranda</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Beranda</h1>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded flex items-center gap-1 text-sm">
          ✎ Ubah
        </button>
      </div>

      {/* Bagian reusable form */}
      {[1, 2, 3].map((bagian) => (
        <section
          key={bagian}
          className="bg-[#1e2a3a] p-4 rounded-xl mb-4 space-y-3"
        >
          <h2 className="font-semibold mb-3 border-b border-gray-600 pb-2">
            Bagian {bagian}
          </h2>

          <div>
            <label className="block text-sm mb-1">Judul</label>
            <input
              type="text"
              placeholder="Lorem Ipsum"
              className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Sub Judul</label>
            <input
              type="text"
              placeholder="Lorem Ipsum"
              className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400"
            />
          </div>

          {/* Tombol Section */}
          <div className="border border-gray-500 bg-[#2b3b4e] p-3 rounded-md space-y-3">
            <label className="block text-sm font-semibold mb-1">Tombol</label>

            <div>
              <label className="block text-sm mb-1">Judul</label>
              <input
                type="text"
                placeholder="Lorem Ipsum"
                className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400"
              />
            </div>

            {/* Select hanya ditampilkan di Bagian 2 */}
            {bagian === 2 && (
              <div>
                <label className="block text-sm mb-1">Select</label>
                <select
                  className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 text-gray-300"
                >
                  <option>Select Lorem Ipsum</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm mb-1">Tautan Video</label>
              <input
                type="text"
                placeholder="https://qwerty.com/"
                className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400"
              />
            </div>

            {/* Tambahan konten untuk Bagian 3 */}
            {bagian === 3 && (
              <div>
                <label className="block text-sm mb-1">
                  Maksimal Konten yang Tampil
                </label>
                <input
                  type="text"
                  placeholder="Lorem Ipsum"
                  className="w-full p-2 rounded-md bg-[#2b3b4e] border border-gray-500 placeholder-gray-400"
                />
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default BerandaSettings;
