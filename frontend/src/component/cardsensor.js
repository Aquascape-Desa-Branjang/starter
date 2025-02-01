import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import closeIcon from "../ikon/close.png"; // Ikon close
import downloadIcon from "../ikon/download.png"; // Ikon download

// Daftarkan chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const CardSensor = ({ name, value, data }) => {
  const [showDetail, setShowDetail] = useState(false);

  // Fungsi untuk menghitung nilai tertinggi, terendah, dan rata-rata
  const getHighestValue = () => Math.max(...data);
  const getLowestValue = () => Math.min(...data);
  const getAverageValue = () =>
    (data.reduce((acc, curr) => acc + curr, 0) / data.length).toFixed(2);

  // Konfigurasi untuk grafik garis menggunakan data yang tersedia
  const chartData = {
    labels: data.map((_, index) => `Data ${index + 1}`),
    datasets: [
      {
        label: "Sensor Value",
        data: data,
        borderColor: "#1d4ed8",
        backgroundColor: "rgba(29, 78, 216, 0.1)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Nonaktifkan rasio aspek agar tinggi dapat diatur bebas
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        reverse: true
      },
      y: {
        ticks: {
          stepSize: 5,
        },
        min: 50,
        max: 100
      }
    }
  };

  const downloadChart = () => {
    const link = document.createElement("a");
    link.download = `${name}-chart.png`;
    link.href = document.querySelector("canvas").toDataURL("image/png");
    link.click();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center border border-gray-300">
      <h2 className="text-xl font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
        {name}
      </h2>
      <p
        className="text-4xl font-semibold text-blue-500"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {value}
      </p>
      <button
        className="text-black-500 underline mt-2 font-bold"
        onClick={() => setShowDetail(true)}
      >
        Detail
      </button>

      {/* Pop-up Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[70%] md:w-[65%] lg:w-[45%] max-w-5xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-left">{name} Details</h3>
              <div className="flex gap-2">
                <button
                  className="bg-transparent p-2 rounded-lg"
                  onClick={downloadChart}
                  title="Download Chart"
                >
                  <img src={downloadIcon} alt="Download" className="h-6 w-6" />
                </button>
                <button
                  className="bg-transparent p-2 rounded-lg"
                  onClick={() => setShowDetail(false)}
                  title="Close"
                >
                  <img src={closeIcon} alt="Close" className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 text-left">
              {/* Kotak Data */}
              <div className="flex flex-col gap-4 w-full md:w-1/4">
                <div className="bg-white-100 p-4 rounded border border-gray-300 shadow-md text-left">
                  <p className="font-bold text-green-700">Highest</p>
                  <p className="text-3xl font-bold text-blue-500">{getHighestValue()}</p>
                </div>
                <div className="bg-white-100 p-4 rounded border border-gray-300 shadow-md text-left">
                  <p className="font-bold text-yellow-700">Average</p>
                  <p className="text-3xl font-bold text-blue-500">{getAverageValue()}</p>
                </div>
                <div className="bg-white-100 p-4 rounded border border-gray-300 shadow-md text-left">
                  <p className="font-bold text-red-700">Lowest</p>
                  <p className="text-3xl font-bold text-blue-500">{getLowestValue()}</p>
                </div>
              </div>

              {/* Grafik Line */}
              <div className="w-full md:w-2/3">
                <div style={{ height: "300px", width: "100%" }}> {/* Tinggi grafik 500px */}
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSensor;
