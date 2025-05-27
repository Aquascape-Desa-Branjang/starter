import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [nik, setNik] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");

  const validCredentials = {
    nik: "1234567890123456",
    tanggalLahir: "2000-01-01",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nik === validCredentials.nik && tanggalLahir === validCredentials.tanggalLahir) {
      toast.success("Login berhasil!");
      navigate("/admin/beranda");
    } else {
      toast.error("NIK atau Tanggal Lahir salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a1d2c] text-white">
      <div className="w-full max-w-md p-6 rounded-lg shadow-xl bg-[#112d41]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="nik" className="block mb-1 font-medium text-white">
              NIK
            </label>
            <input
              id="nik"
              type="text"
              maxLength={16}
              required
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              placeholder="Masukkan NIK"
              className="w-full px-4 py-2 rounded-md bg-[#0a1d2c] border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label htmlFor="tanggalLahir" className="block mb-1 font-medium text-white">
              Tanggal Lahir
            </label>
            <input
              id="tanggalLahir"
              type="date"
              required
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#0a1d2c] border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#66DDAA] text-[#0a1d2c] font-semibold rounded-md hover:bg-green-500 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
