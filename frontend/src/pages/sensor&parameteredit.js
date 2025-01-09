import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../component/header';

// Dummy data for sensors
const sensorsData = [
    { id: 1, sensor: "Inverter SRNE", parameter: "cih_uy", name: "Battery Last Equalization", unit: "kwh", path: "dummy/path1" },
    { id: 2, sensor: "Inverter Solis", parameter: "Inverter Solis", name: "Active Power", unit: "Watt", path: "dummy/path2" },
    { id: 3, sensor: "Pyranometer", parameter: "UV_Radiation", name: "UV Level", unit: "lvl", path: "dummy/path3" },
    { id: 4, sensor: "Inverter Solis", parameter: "Inverter Solis", name: "Total Energy", unit: "Energy", path: "dummy/path4" },
    { id: 5, sensor: "RTD", parameter: "Temperature", name: "Temperature", unit: "C", path: "dummy/path5" },
];

const EditSensorParameter = () => {
  const { id } = useParams(); // Mendapatkan id dari URL
  const navigate = useNavigate();

  // Mencari data sensor yang sesuai dengan id
  const sensorToEdit = sensorsData.find((sensor) => sensor.id === parseInt(id));

  // Jika tidak ada sensor yang cocok, arahkan kembali ke halaman daftar sensor
  if (!sensorToEdit) {
    navigate("/sensor&parameter");
  }

  // State untuk menyimpan data yang diedit
  const [formData, setFormData] = useState({
    sensor: sensorToEdit.sensor,
    parameter: sensorToEdit.parameter,
    name: sensorToEdit.name,
    unit: sensorToEdit.unit,
    path: sensorToEdit.path, // Menambahkan path ke formData
  });

  // Handle perubahan form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle pengiriman form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Biasanya di sini Anda akan mengirim data yang sudah diperbarui ke server
    console.log("Updated Sensor Data:", formData);
    navigate("/sensor&parameter"); // Arahkan kembali ke halaman sensor
  };

  // Fungsi untuk kembali
  const handleBack = () => {
    navigate("/sensor&parameter");
  };

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4] flex-col">
      {/* Include Header */}
      <Header pageName="Edit Sensor & Parameter" databaseName="Database / Sensor & Parameter" notifications={0} />
      
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
          {/* Header dengan tombol Back dan Save */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Sensor & Parameter</h2>
            {/* Tombol Back dan Save */}
            <div className="flex space-x-4">
              <button
                onClick={handleBack}
                className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>

          {/* Form untuk mengedit sensor dan parameter */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Menggunakan flexbox untuk mengatur dan menggeser form */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Sensor</label>
              <input
                type="text"
                name="sensor"
                value={formData.sensor}
                onChange={handleChange}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Sensor Name"
                required
              />
            </div>
            

            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Parameter</label>
              <input
                type="text"
                name="parameter"
                value={formData.parameter}
                onChange={handleChange}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Parameter"
                required
              />
            </div>

            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Name"
                required
              />
            </div>

            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Unit"
                required
              />
            </div>

            {/* Menambahkan field untuk path */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Path</label>
              <input
                type="text"
                name="path"
                value={formData.path}
                onChange={handleChange}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Path"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSensorParameter;
