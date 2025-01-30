import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import axios from "axios";

const SensorParameterAdd = () => {
  const [sensor, setSensor] = useState("");
  const [parameter, setParameter] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [path, setPath] = useState("");

  const [sensorOptions, setSensorOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sensors");
        setSensorOptions(response.data);
      } catch (error) {
        console.error("Error fetching sensors:", error);
      }
    };
    fetchSensors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Memastikan bahwa path menggabungkan path sensor yang dipilih
    const selectedSensor = sensorOptions.find((option) => option.customId === sensor);
    const fullPath = selectedSensor ? `${selectedSensor.path}${path}` : path;
  
    const sensorData = {
      sensor,  // Mengirimkan customId dari sensor yang dipilih
      parameter,
      name,
      unit,
      path: fullPath,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/parameters/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sensorData),
      });
  
      const result = await response.json();
      if (response.ok) {
        navigate("/sensor&parameter");
      } else {
        alert("Failed to add parameter");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while adding the parameter.");
    }
  };

  return (
    <div className="flex h-screen bg-[#F9F4F4] flex-col">
      <Header pageName="Add Sensor & Parameter" databaseName="Database / Sensor & Parameter" notifications={0} />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Add Sensor & Parameter</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/sensor&parameter")}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Sensor</label>
              <select
                value={sensor}
                onChange={(e) => setSensor(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                required
              >
                <option value="" disabled>
                  Select Sensor
                </option>
                {sensorOptions.map((option) => (
                  <option key={option._id} value={option.customId}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Parameter</label>
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
              <label className="w-1/4 text-sm font-medium text-gray-700">Name</label>
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
              <label className="w-1/4 text-sm font-medium text-gray-700">Unit</label>
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
              <label className="w-1/4 text-sm font-medium text-gray-700">Path</label>
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
