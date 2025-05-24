// src/App.js
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Sisi Admin
import Login from "./pages/admin/login";
import BerandaAdmin from "./pages/admin/berandaadmin";
import BeritaAdmin from "./pages/admin/beritaadmin";
import BeritaBaru from "./pages/admin/beritabaru";
import BeritaEdit from "./pages/admin/beritaedit";
import ProdukAdmin from "./pages/admin/produkadmin";
import ProdukBaru from "./pages/admin/produkbaru";
import ProdukEdit from "./pages/admin/produkedit";

// Sisi Guest
import Beranda from "./pages/guest/beranda";   // <-- default import yang benar
import Berita from "./pages/guest/berita";
import BeritaDetail from "./pages/guest/beritadetail";
import Produk from "./pages/guest/produk";
import ProdukDetail from "./pages/guest/produkdetail";

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
        <Route path="/guest/berita" element={<Berita />} />
        <Route path="/guest/beritadetail/:id" element={<BeritaDetail />} />
        <Route path="/guest/produk" element={<Produk />} />
        <Route path="/guest/produkdetail/:id" element={<ProdukDetail />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/beranda" element={<BerandaAdmin />} />
        <Route path="/admin/berita" element={<BeritaAdmin />} />
        <Route path="/admin/berita/baru" element={<BeritaBaru />} />
        <Route path="/admin/berita/edit/:id" element={<BeritaEdit />} />
        <Route path="/admin/produk" element={<ProdukAdmin />} />
        <Route path="/admin/produk/baru" element={<ProdukBaru />} />
        <Route path="/admin/produk/edit/:id" element={<ProdukEdit />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isLayoutHidden && <Footer />}
    </>
  );
}

export default App;
