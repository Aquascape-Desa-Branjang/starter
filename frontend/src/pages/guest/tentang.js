import React from "react";
import headerImg from "../../gambar/tentang/bg-tentang.jpg";
import ownerImg from "../../gambar/tentang/owner.jpg";
import mengenal1Img from "../../gambar/tentang/mengenal-1.jpg";
import mengenal2Img from "../../gambar/tentang/mengenal-2.jpg";
import mengenal3Img from "../../gambar/tentang/mengenal-3.jpg";
import cintaImg from "../../gambar/tentang/cinta.jpg";

export default function Tentang() {

  return (
    <main className="bg-[#0a1d2c] text-white min-h-screen">
      
      {/* Gambar Header dengan Overlay dan Teks */}
      <div className="relative w-full h-full">
        <div className="relative overflow-hidden w-full h-auto xl:h-96">
          <img
            src={headerImg}
            alt="Header"
            className="w-full h-full object-cover bg-no-repeat object-[center_30%]"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-35 pointer-events-none" />
        </div>
        
        {/* Overlay hitam semi-transparan */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
          <div className="p-8 md:p-10 lg:p-14 flex flex-col items-center justify-center gap-2 xl:gap-4 text-center m-auto">
            <h1 className="font-zilla-slab text-primary leading-none text-4xl md:text-5xl font-bold">
              Tentang Kami
            </h1>

            <h2 class="font-medium text-2xl leading-tight text-default-text">
              Menghadirkan ruang kreativitas yang menghidupkan seni dalam akuarium
            </h2>
          </div>
        </div>
      </div>

      {/* Tentang Kami */}
      <section id="tentang" className="text-center pt-12 px-4 flex flex-col gap-7 xl:pt-24 xl:pb-12 xl:px-28 py-6">
        <div className="flex flex-col gap-6">
          <h3 className="font-zilla-slab font-bold text-4xl leading-none text-default-text xl:text-6xl">Mengenal Aquascape</h3>

          <p className="text-default-text font-normal text-sm leading-normal xl:text-lg xl:w-8/12 xl:mx-auto">
            Aquascape adalah kerajinan menghias aquarium dengan menggabungkan keindahan tanaman, kayu, dan batu. Aquascape bertujuan untuk menciptakan pemandangan bawah air yang menyerupai ekosistem alam.
          </p>

          <p className="text-default-text font-normal text-sm leading-normal xl:text-lg xl:w-8/12 xl:mx-auto">
            Kerajinan ini tidak hanya mempercantik tampilan aquarium, tetapi juga menghadirkan nuansa alam yang tenang, menyegarkan, dan mendekatkan manusia dengan keindahan alam yang sulit dijangkau.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 xl:gap-8">
          <div className="rounded-lg overflow-hidden w-full h-auto xl:max-h-full">
            <img
              src={mengenal1Img}
              alt="Mengenal Aquascape"
              className="w-full h-full object-cover object-center bg-no-repeat"
            />
          </div>

          <div className="grid grid-rows-2 gap-3 xl:gap-8">
            <div className="rounded-lg overflow-hidden w-full h-auto xl:max-h-56">
              <img
                src={mengenal2Img}
                alt="Mengenal Aquascape"
                className="w-full h-full object-cover object-center bg-no-repeat"
              />
            </div>

            <div className="rounded-lg overflow-hidden w-full h-auto xl:max-h-56">
              <img
                src={mengenal3Img}
                alt="Mengenal Aquascape"
                className="w-full h-full object-cover object-center bg-no-repeat"
              />
            </div>
          </div>
        </div>
      </section>

       {/* owner */}
      <section id="owner" className="text-center pt-6 px-4 flex flex-col gap-7 xl:py-12 xl:px-28 py-6">
        <div className="flex flex-col gap-6">
          <h3 className="font-zilla-slab font-bold text-4xl leading-none text-default-text xl:text-6xl">Perjalanan Awal</h3>

          <p className="text-default-text font-normal text-sm leading-normal xl:text-lg xl:w-8/12 xl:mx-auto">
            Berawal dari akuarium yang hanya berisi kayu dan batu batuan biasa, menimbulkan ide untuk membuat hiasan akuarium yang lebih menarik.
          </p>

          <p className="text-default-text font-normal text-sm leading-normal xl:text-lg xl:w-8/12 xl:mx-auto">
            Bahkan Limbah plastik yang kerap dibuang atau di bakar, dapat disulap menjadi karya seni yang indah.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-lg overflow-hidden w-full h-auto mx-auto xl:w-1/2">
            <img
              src={ownerImg}
              alt="Owner"
              className="w-full h-full object-cover object-center bg-no-repeat"
            />
          </div>
        </div>
      </section>

      {/* Cinta */}
      <section id="cinta" className="text-center pt-6 px-4 flex flex-col gap-7 xl:py-12 xl:px-28 py-6 pb-12 xl:pb-24">
        <div className="flex flex-col gap-6">
          <h3 className="font-zilla-slab font-bold text-4xl leading-none text-default-text xl:text-6xl">Dibuat dengan Cinta</h3>

          <p className="text-default-text font-normal text-sm leading-normal xl:text-lg xl:w-8/12 xl:mx-auto">
            Bukan sekadar produk, tapi karya yang tumbuh dari rasa, imajinasi, dan perhatian.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-lg overflow-hidden w-full h-auto mx-auto xl:w-1/2">
            <img
              src={cintaImg}
              alt="Dibuat dengan Cinta"
              className="w-full h-full object-cover object-center bg-no-repeat"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
