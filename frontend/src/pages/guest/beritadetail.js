import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import dummyImg from "../../gambar/dummyberita.png";
import CardBerita from "../../component/cardberita";

export default function BeritaDetail() {
  const { id } = useParams();
      
  const beritaList = [
    {
      id: "1",
      gambar: dummyImg,
      judul: "Inovasi Daur Ulang Limbah Plastik Jadi Dekorasi",
      isi: `Para kreator muda di Yogyakarta berhasil mengubah limbah plastik menjadi dekorasi bernilai seni tinggi. Mereka menggunakan teknik pewarnaan alami dan bentuk organik untuk menarik perhatian pasar domestik maupun internasional.`,
      detailLain: `Proyek ini melibatkan komunitas lokal dan bertujuan meningkatkan kesadaran akan bahaya limbah plastik, sekaligus menciptakan peluang ekonomi baru.`,
    },
    {
      id: "2",
      gambar: dummyImg,
      judul: "Kampanye Hijau Lewat Karya Seni",
      isi: `Melalui pameran seni bertema lingkungan, seniman dari berbagai daerah memamerkan karya berbahan limbah daur ulang. Lukisan, patung, hingga instalasi multimedia dibuat dari sampah rumah tangga yang telah diolah.`,
      detailLain: `Kampanye ini mendapat dukungan dari pemerintah daerah dan mengundang banyak perhatian dari masyarakat umum serta media nasional.`,
    },
    {
      id: "3",
      gambar: dummyImg,
      judul: "Dekorasi Ramah Lingkungan Semakin Diminati",
      isi: `Tren dekorasi rumah kini mulai bergeser ke arah yang lebih berkelanjutan. Produk-produk seperti vas dari botol bekas, pot dari plastik terurai, dan hiasan dinding dari kayu daur ulang menjadi pilihan utama para desainer interior.`,
      detailLain: `Konsumen mulai sadar bahwa keindahan tidak harus mengorbankan lingkungan, sehingga permintaan akan dekorasi hijau meningkat tajam.`,
    },
    {
      id: "4",
      gambar: dummyImg,
      judul: "Anak Muda Bangun UMKM dari Limbah Plastik",
      isi: `Sekelompok mahasiswa membentuk UMKM berbasis daur ulang yang mengolah limbah plastik menjadi produk bernilai jual seperti gantungan kunci, souvenir, dan perlengkapan kantor.`,
      detailLain: `UMKM ini tidak hanya menghasilkan produk, tetapi juga membuka lapangan kerja bagi warga sekitar.`,
    },
    {
      id: "5",
      gambar: dummyImg,
      judul: "Pendidikan Lingkungan Dikenalkan Lewat Kegiatan Kreatif",
      isi: `Sekolah-sekolah di Bandung kini mulai mengintegrasikan pendidikan lingkungan dalam kegiatan seni dan kerajinan tangan. Siswa diajak membuat karya dari sampah plastik sebagai bagian dari kurikulum.`,
      detailLain: `Guru dan orang tua mendukung pendekatan ini karena mampu meningkatkan kesadaran lingkungan sejak usia dini.`,
    },
    {
      id: "6",
      gambar: dummyImg,
      judul: "Karya Daur Ulang Indonesia Tembus Pasar Ekspor",
      isi: `Produk kerajinan tangan dari plastik daur ulang buatan Indonesia kini berhasil menembus pasar Eropa. Desain etnik dan kualitas bahan menjadi nilai jual utama yang disukai konsumen mancanegara.`,
      detailLain: `Para pelaku UMKM berharap dukungan pemerintah agar bisa meningkatkan produksi dan kapasitas ekspor.`,
    },
    {
      id: "7",
      gambar: dummyImg,
      judul: "Festival Lingkungan Hidup Angkat Isu Sampah",
      isi: `Festival tahunan di Surabaya mengangkat tema pelestarian lingkungan dengan berbagai kegiatan seperti lomba daur ulang, pameran karya seni, dan talkshow bersama aktivis lingkungan.`,
      detailLain: `Ribuan pengunjung hadir dalam acara tersebut dan banyak peserta muda menunjukkan karya inovatif mereka.`,
    },
    {
      id: "8",
      gambar: dummyImg,
      judul: "Start-up Hijau Hadirkan Solusi Baru Pengolahan Sampah",
      isi: `Sebuah start-up baru di Jakarta meluncurkan aplikasi yang memudahkan masyarakat mengelola sampah plastik dari rumah. Aplikasi ini terintegrasi dengan sistem pengumpulan dan pusat daur ulang.`,
      detailLain: `Solusi digital ini diharapkan bisa menjadi bagian dari gerakan menuju kota bebas sampah plastik.`,
    },
  ];

  const berita = beritaList.find((b) => b.id === id);
  const beritaLain = beritaList.filter((b) => b.id !== id);
  const dummyName = berita.judul;
  
  useEffect(() => {
      document.title = "Antoaquarium | " + dummyName;
    }, []);

  if (!berita) {
    return (
      <div className="min-h-screen bg-[#0a1d2c] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold mb-4">Berita Tidak Ditemukan</h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a1d2c] text-white p-4">
      <h1 className="text-2xl font-bold mb-1">{berita.judul}</h1>
      <p className="text-sm text-gray-400 mb-4">Kategori: Berita Terkini</p>

      {/* Gambar Berita Utama - diubah agar tidak terpotong */}
      <img
        src={berita.gambar}
        alt={berita.judul}
        className="w-full max-h-[70vh] object-contain rounded-lg mb-4"
      />

      <p className="text-sm leading-relaxed mb-4 whitespace-pre-line">
        {berita.isi}
      </p>
      <p className="text-sm text-gray-300 mb-6">{berita.detailLain}</p>

      {/* Berita Lainnya */}
      <section className="px-4">
        <h2 className="text-2xl font-bold text-left mb-4">Berita Lainnya</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beritaLain.map((item) => (
            <CardBerita
              key={item.id}
              id={item.id}
              gambar={item.gambar}
              judul={item.judul}
              cuplikan={item.isi.slice(0, 100) + "..."}
            />
          ))}
        </div>
      </section>

      <div className="w-full text-center mt-8">
        <a
          href="/guest/berita"
          className="inline-block bg-[#66DDAA] hover:bg-[#57c49b] text-[#0a1d2c] font-semibold px-5 py-2 w-80 rounded-full transition duration-200 text-center shadow-md"
        >
          Lihat Semua Berita →
        </a>
      </div>
    </main>
  );
}
