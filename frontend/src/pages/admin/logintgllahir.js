import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";

import logo from "../../gambar/logo.png";

const LoginTanggalLahir = () => {
  const navigate = useNavigate();
  const [tgl, setTgl] = useState("");
  const [bln, setBln] = useState("");
  const [thn, setThn] = useState("");
  const [kode, setKode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nik = localStorage.getItem("login_nik");
    const password = `${tgl}${bln}${thn}${kode}`;
    console.log('nik:');
    console.log(nik);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        username: nik,
        password,
      });

      Cookies.set("token", response.data.token, {
        expires: 2,
        secure: true,
        sameSite: "Strict",
      });

      toast.success("Login berhasil!");
      navigate("/admin/pengaturanproduk");
    } catch (error) {
      toast.error(error.response?.data?.message || "Username atau password tidak valid!");
      navigate("/admin/loginnik");
    }
  };


  return (
    <div className="min-h-screen bg-[#162232] flex flex-col items-center justify-center text-white px-4">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-40 mb-8" />

      {/* Judul */}
      <h1 className="text-4xl font-semibold mb-4">Masuk</h1>

      <p className="text-sm text-gray-300 mb-6">Masukan tanggal lahir anda</p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs flex flex-col items-center gap-4"
      >
        {/* Input tanggal lahir */}
        <div className="flex justify-center gap-2 w-full">
          <input
            type="text"
            maxLength={2}
            value={tgl}
            onChange={(e) => setTgl(e.target.value)}
            className="w-14 text-center px-2 py-2 rounded-md bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            maxLength={2}
            value={bln}
            onChange={(e) => setBln(e.target.value)}
            className="w-14 text-center px-2 py-2 rounded-md bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            maxLength={4}
            value={thn}
            onChange={(e) => setThn(e.target.value)}
            className="w-14 text-center px-2 py-2 rounded-md bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            maxLength={2}
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            className="w-14 text-center px-2 py-2 rounded-md bg-transparent border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tombol Masuk */}
        <button
          type="submit"
          className="bg-[#004c99] hover:bg-[#0066cc] transition text-white font-semibold py-2 px-6 rounded-full flex items-center justify-center gap-2 w-full mt-4"
        >
          Masuk <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
};

export default LoginTanggalLahir;
