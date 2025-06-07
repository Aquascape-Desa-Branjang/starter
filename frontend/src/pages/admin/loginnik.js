import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import logo from "../../gambar/logo.png"; // Pastikan path ini sesuai struktur folder Anda

const Login = () => {
  const navigate = useNavigate();
  const [nik, setNik] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("login_nik", nik);
    navigate("/admin/logintgllahir");
  };

  return (
    <div className="min-h-screen bg-[#162232] flex flex-col items-center justify-center text-white px-4">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-40 mb-8" />

      {/* Judul */}
      <h1 className="text-4xl font-semibold mb-6">Masuk</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <label htmlFor="nik" className="text-sm font-medium">
          Masukan nomor identitas anda
        </label>
        <input
          id="nik"
          type="text"
          maxLength={16}
          required
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-[#004c99] hover:bg-[#0066cc] transition text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2"
        >
          Selanjutnya <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
};

export default Login;
