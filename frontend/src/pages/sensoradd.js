import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Header from "../component/header";

const SensorAdd = () => {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data yang akan dikirimkan dalam format JSON
    const sensorData = {
      name: name,
      path: path
    };

    try {
      // Mengirim POST request dengan data JSON
      const response = await fetch("http://localhost:5000/api/sensors/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Mengirim data JSON
        },
        body: JSON.stringify(sensorData), // Mengubah data menjadi string JSON
      });

      // Menunggu response dan memeriksa keberhasilan
      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/sensorlist"), 1000); // Redirect setelah sukses
      } else {
        setErrorMessage(result.message || "Failed to add sensor.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setErrorMessage("An error occurred while adding the sensor.");
    }
  };

  const handleBack = () => {
    navigate("/sensorlist");
  };

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4] flex-col">
      <Header pageName="Add Sensor & Parameter" databaseName="Database / Sensor & Parameter" notifications={0} />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Add Sensor</h2>
            <div className="flex space-x-4">
              <button onClick={handleBack} className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600">Back</button>
              <button onClick={handleSubmit} className="px-6 py-2 w-36 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600">Save</button>
            </div>
          </div>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {success && <p className="text-green-500 mb-4">Sensor added successfully! Redirecting...</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
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

export default SensorAdd;
