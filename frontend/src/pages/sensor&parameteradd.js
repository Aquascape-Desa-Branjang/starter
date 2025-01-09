import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../component/header'; 

const SensorParameterAdd = () => {
  // State untuk form
  const [sensor, setSensor] = useState("");
  const [parameter, setParameter] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [path, setPath] = useState("");

  // Untuk navigasi setelah form disubmit
  const navigate = useNavigate();

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sensor Parameter Added:", { sensor, parameter, name, unit, path });
    navigate("/sensor&parameter");
  };

  const handleBack = () => {
    navigate("/sensor&parameter");
  };

  return (
    <div className="flex h-screen bg-[#F9F4F4] flex-col">
      {/* Include Header */}
      <Header pageName="Add Sensor & Parameter" databaseName="Database / Sensor & Parameter" notifications={0} />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
          {/* Header dengan tombol Back dan Add Sensor & Parameter */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Add Sensor & Parameter</h2>
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

          {/* Form untuk menambah sensor dan parameter */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Menggunakan flexbox untuk mengatur dan menggeser form */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Sensor</label>
              <input
                type="text"
                value={sensor}
                onChange={(e) => setSensor(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Sensor Name"
                required
              />
            </div>

            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Parameter</label>
              <input
                type="text"
                value={parameter}
                onChange={(e) => setParameter(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Parameter"
                required
              />
            </div>

            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Name"
                required
              />
            </div>

            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Unit"
                required
              />
            </div>

            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700 mb-1">Path</label>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
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

export default SensorParameterAdd;
