import jsPDF from "jspdf";

const getBase64ImageFromURL = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Gagal memuat gambar"));
    img.src = url;
  });
};

const handleDownloadPDF = async (produkTersaring) => {
  const doc = new jsPDF("p", "mm", "a4");
  const produkPerHalaman = 4;
  const lebarHalaman = 210;
  const tinggiHalaman = 297;
  const margin = 15;

  const totalHalaman = Math.ceil(produkTersaring.length / produkPerHalaman);

  for (let halaman = 0; halaman < totalHalaman; halaman++) {
    if (halaman > 0) doc.addPage();

    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text("Katalog Produk", lebarHalaman / 2, margin, null, null, "center");

    const start = halaman * produkPerHalaman;
    const end = Math.min(start + produkPerHalaman, produkTersaring.length);
    const items = produkTersaring.slice(start, end);

    let y = margin + 10;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let base64Image = "";

      try {
        base64Image = await getBase64ImageFromURL(item.gambar);
      } catch (error) {
        console.warn("Gagal memuat gambar:", error);
      }

      // Kotak Produk
      doc.setDrawColor(200);
      doc.rect(margin, y, lebarHalaman - margin * 2, 60);

      if (base64Image) {
        doc.addImage(base64Image, "PNG", margin + 5, y + 5, 30, 30);
      }

      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text(`Nama: ${item.nama}`, margin + 40, y + 10);
      doc.text(`Kategori: ${item.kategori}`, margin + 40, y + 17);
      doc.text(`Harga: ${item.harga}`, margin + 40, y + 24);

      y += 65;
    }

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Halaman ${halaman + 1} dari ${totalHalaman}`, lebarHalaman - margin, tinggiHalaman - 10, null, null, "right");
  }

  doc.save("katalog_produk.pdf");
};

// Export fungsi
export { handleDownloadPDF };
