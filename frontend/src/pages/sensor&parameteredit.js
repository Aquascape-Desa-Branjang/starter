import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../component/header";

const EditSensorParameter = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  // State untuk menyimpan data parameter
  const [formData, setFormData] = useState({
    sensor: "", // Tetap menyimpan sensor agar tidak berubah
    parameter: "",
    name: "",
    unit: "",
    path: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data parameter
  useEffect(() => {
    const fetchParameterData = async () => {
      setLoading(true);
      try {
        // Ambil data parameter berdasarkan _id
        const response = await axios.get(`http://localhost:5000/api/parameters/${_id}`);
        const parameterData = response.data;

        setFormData({
          sensor: parameterData.sensor, // Simpan sensor agar tidak berubah
          parameter: parameterData.parameter,
          name: parameterData.name,
          unit: parameterData.unit,
          path: parameterData.path,
        });

        setError("");
      } catch (error) {
        console.error("Error fetching parameter data:", error);
        setError("Failed to fetch parameter data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchParameterData();
  }, [_id]);

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
      parameter: formData.parameter,
      name: formData.name,
      unit: formData.unit,
      path: formData.path, // Hanya update path parameter
    };

    try {
      await axios.put(`http://localhost:5000/api/parameters/${_id}`, updatedData);
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
                onClick={handleSubmit}
                className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>

          {/* Tampilkan pesan loading atau error jika ada */}
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Parameter (Editable) */}
              <div className="flex justify-start items-center space-x-4 ml-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">Parameter</label>
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

              {/* Name (Editable) */}
              <div className="flex justify-start items-center space-x-4 ml-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">Name</label>
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

              {/* Path (Editable) */}
              <div className="flex justify-start items-center space-x-4 ml-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">Path</label>
                <input
                  type="text"
                  name="path"
                  value={formData.path}
                  onChange={handleChange}
                  className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                  placeholder="Enter Path Parameter"
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
