import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Header from "../component/header";
import downloadIcon from "../ikon/download.png";

const PLTS = () => {
  const [pltsData, setPltsData] = useState([
    { id: 1, name: "Watt Panel Surya", value: 0, unit: "WATT", history: [] },
    { id: 2, name: "Watt Turbin", value: 0, unit: "WATT", history: [] },
    { id: 3, name: "Battery Capacity", value: 0, unit: "%", history: [] },
  ]);

  useEffect(() => {
    const fetchPLTSData = async () => {
      try {
        const inverterRes = await fetch("http://localhost:5000/api/invertersrnes/A");
        const inverterData = await inverterRes.json();
        console.log("Data InverterSRNE:", inverterData); // Debugging

        const vfdRes = await fetch("http://localhost:5000/api/vfds/A");
        const vfdData = await vfdRes.json();
        console.log("Data VFD:", vfdData); // Debugging

        setPltsData([
          {
            id: 1,
            name: "Watt Panel Surya",
            value: inverterData?.pv_power || 0,
            unit: "WATT",
            history: generateHistory(inverterData?.pv_power || 0),
          },
          {
            id: 2,
            name: "Watt Turbin",
            value: vfdData?.poutput_power || 0,
            unit: "WATT",
            history: generateHistory(vfdData?.poutput_power || 0),
          },
          {
            id: 3,
            name: "Battery Capacity",
            value: inverterData?.battery_level || 0,
            unit: "%",
            history: generateHistory(inverterData?.battery_level || 0),
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPLTSData();
  }, []);

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

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4]">
      <div className="flex-1 flex flex-col">
        <Header pageName="PLTS" databaseName="Database / PLTS" notifications={0} />
        <div className="p-4 flex flex-col gap-4 items-center">
          {pltsData.map((data) => (
            <div key={data.id} className="bg-white rounded-lg shadow p-4 flex flex-row items-center justify-between border border-gray-300" style={{ width: "440px", height: "300px" }}>
              <div className="text-center flex-1">
                <h2 className="text-lg font-bold">{data.name}</h2>
                <p className="text-3xl font-bold text-blue-600">{data.value}</p>
                <p className="text-sm text-gray-500">{data.unit}</p>
              </div>
              <div className="relative" style={{ width: "250px", height: "200px" }}>
                <img src={downloadIcon} alt="Download" className="absolute top-[-30px] right-[10px] cursor-pointer w-6 h-6" onClick={() => handleDownload(`chart-${data.id}`)} />
                <Line
                  id={`chart-${data.id}`}
                  data={{
                    labels: data.history.map((point) => point.label),
                    datasets: [
                      {
                        label: `${data.name} History`,
                        data: data.history.map((point) => point.value),
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PLTS;
