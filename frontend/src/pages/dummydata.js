import React, {useState} from "react";
import Header from '../component/header';

const Dummydata = () => {
    const [dissolvedOxygen, setDissolvedOxygen] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append("oksigen_terlarut", dissolvedOxygen);

        const disOxy = { oksigen_terlarut: dissolvedOxygen}

        try {
            const response = await fetch("http://localhost:5000/api/DO", {
                method: "POST",
                body: JSON.stringify(disOxy),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setDissolvedOxygen((''))
                setError(null)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setError("Error submitting data");
        }
    };

    return (
        <div className="flex h-fullscreen bg-[#F9F4F4] flex-col">
            <Header pageName="Add dummy data" databaseName="Database / Sensor & Parameter" notifications={0} />
            <div className="flex-1 p-6">
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6 mb-6">
                    <table className="min-w-full table-auto mb-6">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Field</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-800">Dissolved Oxygen</td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            value={dissolvedOxygen}
                                            onChange={(e) => setDissolvedOxygen(e.target.value)}
                                            className="w-3/4 h-10 px-4 py-1 border border-gray-300 rounded-lg"
                                            placeholder="Enter Name"
                                            required
                                        />
                                        <button
                                            className="px-3 py-1 w-24 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600"
                                        >
                                            Add
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dummydata;
