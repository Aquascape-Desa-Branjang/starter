import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from '../component/header';
import Pagination from "../component/pagination";
import SearchIkon from "../ikon/search.png";

// Dummy data for sensors
const sensorsData = [
  { id: 1, sensor: "Inverter SRNE", parameter: "cih_uy", name: "Battery Last Equalization", unit: "kwh" },
  { id: 2, sensor: "Inverter Solis", parameter: "Inverter Solis", name: "Active Power", unit: "Watt" },
  { id: 3, sensor: "Pyranometer", parameter: "UV_Radiation", name: "UV Level", unit: "lvl" },
  { id: 4, sensor: "Inverter Solis", parameter: "Inverter Solis", name: "Total Energy", unit: "Energy" },
  { id: 5, sensor: "RTD", parameter: "Temperature", name: "Temperature", unit: "C" },
];

const SensorParameter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Navigation hook

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= 3) {
      setCurrentPage(newPage);
    }
  };

  // Navigate to Add Sensor page
  const handleAddData = () => {
    navigate("/sensor&parameteradd");
  };

  // Navigate to Edit Sensor page
  const handleEditData = (id) => {
    navigate(`/sensor&parameteredit/${id}`); // Navigasi dengan ID sensor
  };

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4] flex-col">
      <Header pageName="Sensor & Parameter" databaseName="Database / Sensor & Parameter" notifications={0} />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full max-w-3xl h-10 px-4 pl-10 border border-gray-300 rounded-lg"
              />
              <img
                src={SearchIkon}
                alt="Search Icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
            </div>

            <button
              onClick={handleAddData}
              className="ml-4 px-6 py-2 w-48 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
            >
              Add Data
            </button>
          </div>

          <table className="min-w-full table-auto mb-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sensor</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Parameter</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unit</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {sensorsData.map((data, index) => (
                <tr
                  key={data.id}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 text-sm text-gray-800">{data.sensor}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{data.parameter}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{data.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{data.unit}</td>
                  <td className="px-4 py-2 text-sm text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <button
                        className="px-3 py-1 w-24 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditData(data.id)}  // Navigasi dengan ID
                        className="px-3 py-1 w-24 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default SensorParameter;
