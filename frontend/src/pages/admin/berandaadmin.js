import React, { useState } from "react";
import footerDataJson from "../../component/footer.json";

export default function BerandaAdmin() {
  const [footerData, setFooterData] = useState(footerDataJson);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFooterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Contoh request ke backend untuk simpan footerData
      // Ganti URL ini sesuai endpoint backend-mu
      const response = await fetch("/api/saveFooterData", {
        method: "POST", // atau PUT sesuai backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(footerData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data footer");

      alert("Data footer berhasil disimpan");
    } catch (error) {
      alert(`Error: ${error.message}\n(Tambah backend untuk simpan permanen)`);
    }
  };

  return (
    <main className="bg-[#0a1d2c] text-white min-h-screen px-6 py-8 flex flex-col justify-between">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Admin</h1>

        {/* Form edit footer tanpa box, input biasa */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-cyan-300">
            Edit Data Footer
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-6 text-white"
          >
            <div>
              <label htmlFor="slogan" className="block mb-1 font-semibold">
                Slogan
              </label>
              <input
                type="text"
                id="slogan"
                name="slogan"
                value={footerData.slogan}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-cyan-400 text-white"
                style={{ fontSize: "1rem" }}
              />
            </div>

            <div>
              <label htmlFor="quote" className="block mb-1 font-semibold">
                Quote
              </label>
              <textarea
                id="quote"
                name="quote"
                value={footerData.quote}
                onChange={handleChange}
                rows={3}
                className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-cyan-400 text-white resize-none"
                style={{ fontSize: "1rem" }}
              />
            </div>

            <div>
              <label htmlFor="owner" className="block mb-1 font-semibold">
                Owner
              </label>
              <input
                type="text"
                id="owner"
                name="owner"
                value={footerData.owner}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-cyan-400 text-white"
                style={{ fontSize: "1rem" }}
              />
            </div>

            <div>
              <label htmlFor="address" className="block mb-1 font-semibold">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={footerData.address}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-gray-500 focus:outline-none focus:border-cyan-400 text-white resize-none whitespace-pre-line"
                style={{ fontSize: "1rem" }}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white font-semibold transition"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
