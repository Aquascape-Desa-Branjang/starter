import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import gambar dari folder src/gambar
import slide1 from "../gambar/slide1.JPG";
import slide2 from "../gambar/slide2.JPG";
import slide3 from "../gambar/slide3.JPG";

const images = [slide1, slide2, slide3];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true, // Memungkinkan pergeseran manual
    pauseOnHover: false, // Tetap berjalan meski di-hover
  };

  return (
    <div className="w-[400px] h-80 mx-auto"> {/* Ukuran diperbesar */}
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="w-full h-full" style={{ outline: "none" }}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
