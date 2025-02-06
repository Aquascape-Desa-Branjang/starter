import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import Header from "../component/header";
import downloadIcon from "../ikon/download.png";
import { usePLTSStore } from "../store/usePLTSStore"; // Mengimpor store PLTS

const PLTS = () => {
  const { 
    VFD, 
    latestVFD, 
    InverterSRNE, 
    latestInverterSRNE, 
    getVFD, 
    getLatestVFD, 
    getInverterSRNE, 
    getLatestInverterSRNE 
  } = usePLTSStore();

  useEffect(() => {
    // Mengambil data saat halaman dimuat
    getVFD();
    getInverterSRNE();
    getLatestVFD();
    getLatestInverterSRNE();
  }, [getVFD, getInverterSRNE, getLatestVFD, getLatestInverterSRNE]);

  const generateHistory = (currentValue) => {
    return [
      { label: "A", value: currentValue - 40 },
      { label: "B", value: currentValue - 30 },
      { label: "C", value: currentValue - 20 },
      { label: "D", value: currentValue - 10 },
      { label: "E", value: currentValue },
    ];
  };

  const handleDownload = (chartId) => {
    const chart = document.getElementById(chartId);
    if (chart) {
      const link = document.createElement("a");
      link.href = chart.toDataURL("image/png");
      link.download = `${chartId}.png`;
      link.click();
    } else {
      console.error("Chart tidak ditemukan:", chartId);
    }
  };

  // Pastikan Anda mengakses nilai yang benar dari objek
  const pvPower = latestInverterSRNE?.pv_power || 0;
  const batteryLevel = latestInverterSRNE?.battery_level || 0;
  const vfdOutputPower = latestVFD?.output_power || 0;

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4]">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header pageName="PLTS" databaseName="Database / PLTS" notifications={0} />
        <div className="p-4 flex flex-col gap-4 items-center">
          {/* Watt Panel Surya */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-row items-center justify-between border border-gray-300" style={{ width: "440px", height: "300px" }}>
            <div className="text-center flex-1">
              <h2 className="text-lg font-bold">Watt Panel Surya</h2>
              <p className="text-3xl font-bold text-blue-600">{pvPower}</p>
              <p className="text-sm text-gray-500">WATT</p>
            </div>
            <div className="relative" style={{ width: "250px", height: "200px" }}>
              <img src={downloadIcon} alt="Download" className="absolute top-[-30px] right-[10px] cursor-pointer w-6 h-6" onClick={() => handleDownload("chart-1")} />
              <Line
                id="chart-1"
                data={{
                  labels: generateHistory(pvPower).map((point) => point.label),
                  datasets: [
                    {
                      label: "Watt Panel Surya History",
                      data: generateHistory(pvPower).map((point) => point.value),
                      borderColor: "rgba(53, 162, 235, 1)",
                      backgroundColor: "rgba(53, 162, 235, 0.4)",
                      fill: true,
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: { title: { display: true, text: "Waktu (s)" } },
                    y: { title: { display: true, text: "Nilai" }, beginAtZero: true, ticks: { stepSize: 50 } },
                  },
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          {/* Watt Turbin */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-row items-center justify-between border border-gray-300" style={{ width: "440px", height: "300px" }}>
            <div className="text-center flex-1">
              <h2 className="text-lg font-bold">Watt Turbin</h2>
              <p className="text-3xl font-bold text-blue-600">{vfdOutputPower}</p>
              <p className="text-sm text-gray-500">WATT</p>
            </div>
            <div className="relative" style={{ width: "250px", height: "200px" }}>
              <img src={downloadIcon} alt="Download" className="absolute top-[-30px] right-[10px] cursor-pointer w-6 h-6" onClick={() => handleDownload("chart-2")} />
              <Line
                id="chart-2"
                data={{
                  labels: generateHistory(vfdOutputPower).map((point) => point.label),
                  datasets: [
                    {
                      label: "Watt Turbin History",
                      data: generateHistory(vfdOutputPower).map((point) => point.value),
                      borderColor: "rgba(53, 162, 235, 1)",
                      backgroundColor: "rgba(53, 162, 235, 0.4)",
                      fill: true,
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: { title: { display: true, text: "Waktu (s)" } },
                    y: { title: { display: true, text: "Nilai" }, beginAtZero: true, ticks: { stepSize: 50 } },
                  },
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          {/* Battery Capacity */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-row items-center justify-between border border-gray-300" style={{ width: "440px", height: "300px" }}>
            <div className="text-center flex-1">
              <h2 className="text-lg font-bold">Battery Capacity</h2>
              <p className="text-3xl font-bold text-blue-600">{batteryLevel}</p>
              <p className="text-sm text-gray-500">%</p>
            </div>
            <div className="relative" style={{ width: "250px", height: "200px" }}>
              <img src={downloadIcon} alt="Download" className="absolute top-[-30px] right-[10px] cursor-pointer w-6 h-6" onClick={() => handleDownload("chart-3")} />
              <Line
                id="chart-3"
                data={{
                  labels: generateHistory(batteryLevel).map((point) => point.label),
                  datasets: [
                    {
                      label: "Battery Capacity History",
                      data: generateHistory(batteryLevel).map((point) => point.value),
                      borderColor: "rgba(53, 162, 235, 1)",
                      backgroundColor: "rgba(53, 162, 235, 0.4)",
                      fill: true,
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: { title: { display: true, text: "Waktu (s)" } },
                    y: { title: { display: true, text: "Nilai" }, beginAtZero: true, ticks: { stepSize: 50 } },
                  },
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PLTS;
