import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import SearchIkon from "../ikon/search.png";

const SensorList = () => {
  const [sensorsData, setSensorsData] = useState([]);
  const [filteredSensors, setFilteredSensors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success", "error", or "info"
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensors");
        const data = await response.json();
        setSensorsData(data);
        setFilteredSensors(data);
      } catch (error) {
        console.error("Error fetching sensors:", error);
      }
    };
    fetchSensors();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredSensors(sensorsData);
    } else {
      setFilteredSensors(
        sensorsData.filter((sensor) =>
          sensor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, sensorsData]);

  const handleAddData = () => {
    navigate("/sensoradd");
  };

  const handleOpenModal = (id) => {
    setUserToDelete(id);
    setModalMessage("Are you sure you want to delete this sensor?");
    setModalType("info"); // You can change this to success or error if needed
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const handleEditData = (id) => {
    navigate(`/sensoredit/${id}`);
  };

  const handleDeleteData = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/sensors/${userToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete sensor");
      }

      setSensorsData(sensorsData.filter((sensor) => sensor.customId !== userToDelete));
      setFilteredSensors(filteredSensors.filter((sensor) => sensor.customId !== userToDelete));
      setModalMessage("Sensor deleted successfully!");
      setModalType("success"); // Show success message after deletion
    } catch (error) {
      console.error("Error deleting sensor:", error);
      setModalMessage("Failed to delete sensor.");
      setModalType("error"); // Show error message if deletion fails
    }
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Custom ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>

                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSensors.map((data, index) => (
                <tr
                  key={data.customId}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 text-sm text-gray-800">{data.customId}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{data.name}</td>
                  <td className="px-4 py-2 text-sm text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <button
                        onClick={() => handleOpenModal(data.customId)}
                        className="px-3 py-1 w-24 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditData(data.customId)}
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
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
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

export default SensorList;
