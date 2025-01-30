import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../component/header";

const EditSensor = () => {
  const { _id } = useParams(); // Get _id from URL
  const navigate = useNavigate();

  // State
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!_id) {
      setErrorMessage("Invalid sensor ID.");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/sensors/${_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch sensor data");
        }
        const sensor = await response.json();
        setName(sensor.name);
        setPath(sensor.path);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setErrorMessage("Failed to fetch sensor data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedSensor = {
      name,
      path,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/sensors/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSensor),
      });

      if (!response.ok) {
        throw new Error("Failed to update sensor");
      }

      navigate("/sensorlist");
    } catch (error) {
      console.error("Error updating sensor:", error);
      setErrorMessage("Failed to update sensor. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/sensorlist");
  };

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4] flex-col">
      <Header
        pageName="Edit Sensor"
        databaseName="Database / List Sensors / Edit Sensor"
        notifications={0}
      />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Sensor</h2>
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
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Sensor Name"
                required
              />
            </div>

            {/* Path Input */}
            <div className="flex justify-start items-center space-x-4 ml-4">
              <label className="w-1/4 text-sm font-medium text-gray-700">Path</label>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                placeholder="Enter Sensor Path"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSensor;
