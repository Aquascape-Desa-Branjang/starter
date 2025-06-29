// src/App.js
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Sisi Admin
import LoginNIK from "./pages/admin/loginnik";
import LoginTGLLahir from "./pages/admin/logintgllahir";
import PengaturanBeranda from "./pages/admin/pengaturanberanda";
import PengaturanProduk from "./pages/admin/pengaturanproduk";

// Sisi Guest
import Beranda from "./pages/guest/beranda";   // <-- default import yang benar
import Berita from "./pages/guest/berita";
import BeritaDetail from "./pages/guest/beritadetail";
import Produk from "./pages/guest/produk";
import ProdukDetail from "./pages/guest/produkdetail";
import Tentang from "./pages/guest/tentang";

// Komponen
import Header from "./component/header";
import Footer from "./component/footer";

function App() {
  const location = useLocation();
  const hideLayoutPaths = ["/admin/login"];

  const isLayoutHidden = hideLayoutPaths.includes(location.pathname);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {!isLayoutHidden && <Header />}

      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<Beranda />} />
        {/* <Route path="/berita" element={<Berita />} /> */}
        {/* <Route path="/beritadetail/:id" element={<BeritaDetail />} /> */}
        <Route path="/berita" element={<Berita />} />
        <Route path="/beritadetail/:id" element={<BeritaDetail />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/produkdetail/:slug" element={<ProdukDetail />} />
        <Route path="/tentang" element={<Tentang />} />

        {/* Admin Routes */}
        <Route path="/admin/loginnik" element={<LoginNIK />} />
        <Route path="/admin/logintgllahir" element={<LoginTGLLahir />} />
        <Route path="/admin/pengaturanberanda" element={<PengaturanBeranda />} />
        <Route path="/admin/pengaturanproduk" element={<PengaturanProduk />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isLayoutHidden && <Footer />}
    </>
  );
}

export default App;
