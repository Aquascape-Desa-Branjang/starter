import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../component/header";

const EditSensorParameter = () => {
  const { _id } = useParams();
  const [sensorOptions, setSensorOptions] = useState([]);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [parameterOptions, setParameterOptions] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    displayName: "",
    sensor: "",
    device: "",
    parameter: "",
    unit: "",
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data parameter
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ambil data parameter berdasarkan _id
        const response = await axios.get(`http://localhost:5000/api/displayitems/${_id}`);
        const data = response.data;

        setFormData({
          sensor: data.sensor, // Simpan sensor agar tidak berubah
          device: data.device,
          parameter: data.parameter,
          displayName: data.displayName,
          unit: data.unit,
        });

        setError("");
      } catch (error) {
        console.error("Error fetching parameter data:", error);
        setError("Failed to fetch parameter data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id]);

  // Fetch options based on formData
  useEffect(() => {
    const fetchOptions = async () => {
      if (formData.sensor) {
        try {
          const sensorResponse = await axios.get("http://localhost:5000/api/sensors");
          setSensorOptions(sensorResponse.data);

          const deviceResponse = await axios.get(`http://localhost:5000/api/sensors/${formData.sensor}/devices`);
          setDeviceOptions(deviceResponse.data);

          const parameterResponse = await axios.get(`http://localhost:5000/api/parameters/${formData.sensor}`);
          setParameterOptions(parameterResponse.data);
        } catch (error) {
          console.error("Error fetching options:", error);
        }
      }
    };

    fetchOptions();
  }, [formData.sensor]); // Trigger when formData.sensor changes

  const handleSensorChange = async (e) => {
    setFormData({ ...formData, sensor: e.target.value });
    try {
      const device = await axios.get(`http://localhost:5000/api/sensors/${e.target.value}/devices`);
      const parameter = await axios.get(`http://localhost:5000/api/parameters/${e.target.value}`);
      setDeviceOptions(device.data)
      setParameterOptions(parameter.data)
    } catch (error) {
      console.error("Error fetching devices or paramaters:", error);
    }
  }

  const handleDeviceChange = (e) => {
    setFormData({ ...formData, device: e.target.value });
  }

  const handleParameterChange = (e) => {
    setFormData({ ...formData, parameter: e.target.value });
  }

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit data ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      displayName: formData.displayName,
      sensor: formData.sensor,
      device: formData.device,
      parameter: formData.parameter,
      unit: formData.unit,
    };

    try {
      await axios.put(`http://localhost:5000/api/displayitems/${_id}`, updatedData);
      navigate("/sensor&parameter");
    } catch (error) {
      console.error("Error updating parameter:", error);
      setError("Failed to update parameter.");
    }
  };

  // Fungsi kembali ke halaman sebelumnya
  const handleBack = () => {
    navigate("/sensor&parameter");
  };

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4] flex-col">
      <Header pageName="Edit Sensor & Parameter" databaseName="Database / Sensor & Parameter" notifications={0} />

      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">


          {/* Tampilkan pesan loading atau error jika ada */}
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Header dengan tombol Back dan Save */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Edit Sensor & Parameter</h2>
                  <div className="flex space-x-4">
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
                    >
                      Back
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Parameter (Editable) */}
                <div className="flex justify-start items-center space-x-4 ml-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700">Sensor</label>
                  <select
                      value={formData.sensor}
                      onChange={(e) => handleSensorChange(e)}
                      className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                      required
                  >
                    <option value="" disabled>
                      Select Sensor
                    </option>
                    {sensorOptions.map((option) => (
                        <option key={option._id} value={option.name}>
                          {option.name}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-start items-center space-x-4 ml-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700">Device</label>
                  <select
                      value={formData.device}
                      onChange={(e) => handleDeviceChange(e)}
                      className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                      required
                  >
                    <option value="" disabled>
                      Select Device
                    </option>
                    {deviceOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-start items-center space-x-4 ml-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700">Parameter</label>
                  <select
                      value={formData.parameter}
                      onChange={(e) => handleParameterChange(e)}
                      className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                      required
                  >
                    <option value="" disabled>
                      Select Parameter
                    </option>
                    {parameterOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                    ))}
                  </select>
                </div>

                {/* Name (Editable) */}
                <div className="flex justify-start items-center space-x-4 ml-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700">Display Name</label>
                  <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                      placeholder="Enter Name"
                      required
                  />
                </div>

                {/* Unit (Editable) */}
                <div className="flex justify-start items-center space-x-4 ml-4">
                  <label className="w-1/4 text-sm font-medium text-gray-700">Unit</label>
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

              </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSensorParameter;
