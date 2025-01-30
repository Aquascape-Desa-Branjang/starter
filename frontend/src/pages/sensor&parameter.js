import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import SearchIkon from "../ikon/search.png";
import axios from "axios";

const SensorParameter = () => {
  const [sensorsData, setSensorsData] = useState([]); // State untuk menyimpan data sensor
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [modalMessage, setModalMessage] = useState(""); // Pesan modal
  const [selectedSensorId, setSelectedSensorId] = useState(null); // Sensor yang akan dihapus
  const [modalType, setModalType] = useState("info"); // Modal type: "info", "success", "error"
  const navigate = useNavigate(); // Navigation hook

  // Mengambil data sensor dari backend ketika komponen dimuat
  useEffect(() => {
    const fetchSensorsData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/parameters");
        setSensorsData(response.data);
      } catch (error) {
        console.error("Error fetching sensors:", error);
      }
    };

    fetchSensorsData();
  }, []);

  // Fungsi untuk menampilkan modal konfirmasi penghapusan
  const confirmDelete = (id) => {
    setSelectedSensorId(id);
    setModalMessage("Are you sure you want to delete this sensor?");
    setModalType("info");
    setIsModalOpen(true);
  };

  // Fungsi untuk menghapus sensor
  const handleDeleteData = async () => {
    if (!selectedSensorId) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/parameters/${selectedSensorId}`);

      if (response.status === 200) {
        setSensorsData(sensorsData.filter((sensor) => sensor._id !== selectedSensorId));
        setModalMessage("Sensor deleted successfully!");
        setModalType("success");
      } else {
        setModalMessage("Failed to delete sensor.");
        setModalType("error");
      }
    } catch (error) {
      console.error("Error deleting sensor:", error);
      setModalMessage("Error deleting sensor. Please try again.");
      setModalType("error");
    } finally {
      setSelectedSensorId(null);
      setIsModalOpen(true);
    }
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSensorId(null);
    setModalMessage("");
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
              onClick={() => navigate("/sensor&parameteradd")}
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
              {sensorsData.length > 0 ? (
                sensorsData.map((data, index) => (
                  <tr
                    key={data._id}
                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 text-sm text-gray-800">{data.sensor?.name || "Unknown Sensor"}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{data.parameter}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{data.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{data.unit}</td>
                    <td className="px-4 py-2 text-sm text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          onClick={() => confirmDelete(data._id)}
                          className="px-3 py-1 w-24 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => navigate(`/sensor&parameteredit/${data._id}`)}
                          className="px-3 py-1 w-24 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center text-sm text-gray-800">
                    No sensors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3
              className={`text-lg font-semibold ${
                modalType === "success"
                  ? "text-green-500"
                  : modalType === "error"
                  ? "text-red-500"
                  : "text-gray-800"
              }`}
            >
              {modalMessage}
            </h3>
            <div className="mt-4 flex justify-end space-x-4">
              {modalType === "info" ? (
                <>
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteData}
                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorParameter;
