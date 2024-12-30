import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Header from "../component/header";
import downloadIcon from "../ikon/download.png"; // Import ikon download

// Registrasi modul Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dummy data untuk PLTS
const pltsData = [
  {
    id: 1,
    name: "Watt Panel Surya",
    value: 50,
    unit: "WATT",
    history: [
      { label: "A", value: 0 },
      { label: "B", value: 0 },
      { label: "C", value: 50 },
      { label: "D", value: 100 },
      { label: "E", value: 100 },
      { label: "F", value: 150 },
    ],
  },
  {
    id: 2,
    name: "Watt Turbin",
    value: 50,
    unit: "WATT",
    history: [
      { label: "A", value: 0 },
      { label: "B", value: 20 },
      { label: "C", value: 40 },
      { label: "D", value: 60 },
      { label: "E", value: 80 },
      { label: "F", value: 100 },
    ],
  },
  {
    id: 3,
    name: "Battery Capacity",
    value: 50,
    unit: "%",
    history: [
      { label: "A", value: 10 },
      { label: "B", value: 20 },
      { label: "C", value: 30 },
      { label: "D", value: 40 },
      { label: "E", value: 50 },
      { label: "F", value: 60 },
    ],
  },
];

const PLTS = () => {
  const handleDownload = (chartId) => {
    const chart = document.getElementById(chartId);
    const link = document.createElement("a");
    link.href = chart.toDataURL("image/png");
    link.download = `${chartId}.png`;
    link.click();
  };

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4]">
      <div className="flex-1 flex flex-col">
        <Header pageName="PLT Hybrid" databaseName="Database / PLT Hybrid" notifications={0} />

        {/* Kontainer Vertikal */}
        <div className="p-4 flex flex-col gap-4 items-center">
          {pltsData.map((data) => (
            <div
              key={data.id}
              className="bg-white rounded-lg shadow p-4 flex flex-row items-center justify-between border border-gray-300"
              style={{ width: "440px", height:"300px" }} // Ukuran card
            >
              {/* Tulisan di samping kiri */}
              <div className="text-center flex-1">
                <h2 className="text-lg font-bold">{data.name}</h2>
                <p className="text-3xl font-bold text-blue-600">{data.value}</p>
                <p className="text-sm text-gray-500">{data.unit}</p>
              </div>

              {/* Grafik dengan Ikon Download */}
              <div className="relative" style={{ width: "250px", height: "200px" }}>
                {/* Ikon Download di atas grafik */}
                <img
                  src={downloadIcon}
                  alt="Download"
                  className="absolute top-[-30px] right-[10px] cursor-pointer w-6 h-6"
                  onClick={() => handleDownload(`chart-${data.id}`)}
                />

                {/* Grafik */}
                <Line
                  id={`chart-${data.id}`} // ID unik untuk grafik
                  data={{
                    labels: data.history.map((point) => point.label),
                    datasets: [
                      {
                        label: `${data.name} History`,
                        data: data.history.map((point) => point.value),
                        borderColor: "rgba(53, 162, 235, 1)",
                        backgroundColor: "rgba(53, 162, 235, 0.4)",
                        fill: true,
                        tension: 0.3, // Membuat garis lebih halus
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Waktu (s)",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Suhu (°C)",
                        },
                        beginAtZero: true,
                        ticks: {
                          stepSize: 50,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false, // Menghapus legend
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PLTS;

