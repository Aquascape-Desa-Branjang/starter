import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/header";
import SearchIkon from "../ikon/search.png";
import axios from "axios";

const SensorParameter = () => {
  const [displayItems, setDisplayItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState("info");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSensorsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/displayitems/");
        setDisplayItems(response.data);
      } catch (error) {
        console.error("Error fetching sensors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorsData();
  }, []);

  const confirmDelete = (id) => {
    setSelectedItem(id);
    setModalMessage("Are you sure you want to delete this sensor?");
    setModalType("info");
    setIsModalOpen(true);
  };

  const handleDeleteData = async () => {
    if (!selectedItem) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/displayitems/${selectedItem}`);

      if (response.status === 200) {
        setDisplayItems(displayItems.filter((sensor) => sensor._id !== selectedItem));
        setModalMessage("Sensor deleted successfully!");
        setModalType("success");
      } else {
        throw new Error("Failed to delete sensor.");
      }
    } catch (error) {
      console.error("Error deleting sensor:", error);
      setModalMessage("Error deleting sensor. Please try again.");
      setModalType("error");
    } finally {
      setSelectedItem(null);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setModalMessage("");
  };

  const filteredData = displayItems.filter((item) =>
    item.sensor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4] flex-col">
      <Header pageName="Sensor & Parameter" databaseName="Database / Sensor & Parameter" notifications={0} />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by Sensor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

          {loading ? (
            <p className="text-center text-gray-700">Loading data...</p>
          ) : (
            <table className="min-w-full table-auto mb-6">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sensor</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Device</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Parameter</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unit</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((data, index) => (
                    <tr
                      key={data._id}
                      className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                    >
                      <td className="px-4 py-2 text-sm text-gray-800">{data.sensor || "Unknown Sensor"}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{data.device}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{data.parameter}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{data.displayName}</td>
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
                    <td colSpan="6" className="px-4 py-2 text-center text-sm text-gray-800">
                      No sensors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-800">{modalMessage}</h3>
            <div className="mt-4 flex justify-end space-x-4">
              {modalType === "info" && (
                <button onClick={handleDeleteData} className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                  Delete
                </button>
              )}
              <button onClick={handleCloseModal} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorParameter;
