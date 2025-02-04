// Monitoring.js
import React, {useEffect, useState} from 'react';
import CardSensor from '../component/cardsensor'; // Import komponen CardSensor
import Header from '../component/header';
import {useDOStore} from "../store/useDOStore";
import {useDataStore} from "../store/useDataStore"; // Import komponen Header

// const sensors = [
//   { id: 1, name: "pH (pH)", value: 50, data: [50, 55, 45, 60, 52] },
//   { id: 2, name: "Dissolved Oxygen (mg/L)", value: 46, data: [46, 48, 45, 50, 43] },
//   { id: 3, name: "Temperature (°C)", value: 22, data: [20, 22, 23, 21, 22] },
//   { id: 4, name: "Humidity (%)", value: 35, data: [33, 36, 38, 30, 35] },
//   { id: 5, name: "Pressure (Bar)", value: 1.2, data: [1.2, 1.3, 1.1, 1.4, 1.2] },
//   { id: 6, name: "Flow Rate (L/min)", value: 32, data: [32, 34, 30, 33, 31] },
//   { id: 7, name: "Turbidity (NTU)", value: 15, data: [15, 16, 14, 17, 15] },
//   { id: 8, name: "Voltage (V)", value: 3.7, data: [3.6, 3.7, 3.8, 3.5, 3.7] },
//   { id: 9, name: "Light Intensity (Lux)", value: 22, data: [20, 25, 22, 24, 22] },
//   { id: 10, name: "Speed (m/s)", value: 12, data: [11, 12, 13, 10, 12] },
//   { id: 11, name: "CO2 (ppm)", value: 10, data: [9, 10, 11, 10, 12] },
//   { id: 12, name: "Oxygen Level (%)", value: 21, data: [20, 22, 21, 20, 21] },
// ];

const Monitoring = () => {
  // const [DO, setDO] = useState({value: null})
  const {subscribeSocket, getLatestDO, latestDO, DO, getDO} = useDOStore()
  const {latestData, getLatestData, isValueLoading, getGraph, isGraphLoading, graph} = useDataStore()

  useEffect( () => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('http://localhost:5000/api/do/')
    //     const data = await response.json();
    //     setDO({value: data[0].oksigen_terlarut});
    //   } catch (error) {
    //     console.log("Failed to fetch DO: ", error)
    //   }
    // }

    // fetchData()
    getDO()
    //
    // getLatestDO()

    getLatestData()
    getGraph()

    // subscribeSocket()
  }, [getLatestData, getGraph, getDO])

  useEffect(() => {
    if (latestData && graph && DO !== null) {
      console.log('Latest Data:', latestData);
      console.log('Graph data:', graph)
      console.log('DOG: ', DO)
    }
  }, [latestData, graph]); // Log latestData whenever it changes

  return (
    <div className="flex h-fullscreen bg-[#F9F4F4]">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Include Header */}
        <Header pageName="Monitoring" databaseName="Database / Monitoring" notifications={0} />

        <div className="p-4 flex flex-col gap-4">
          {/* Map */}
          <div className="bg-white p-4 rounded-lg shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4995481261174!2d109.46853107460685!3d-6.830255646756649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e705c9ae10d9799%3A0xf0f4bc354d0d2b40!2sTambak%20Udang%20Prima%20Sukses%20Bersama!5e0!3m2!1sen!2sid!4v1234567890123"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen="true"
              loading="lazy"
            ></iframe>
          </div>

          {/* Sensor Data */}
          <div>
            {isValueLoading || isGraphLoading ? (
                <p>loading</p>
            ) : (
            <div className="grid grid-cols-4 gap-4">
              {latestData && latestData.length > 0 ? (
                  latestData.map((data, index) => (
                    <CardSensor key={index} name={`${data[0]} ${data[1]}`} value={data[2]} data={graph[index]} />
                  ))) : (
                      <div>Not found</div>
              )}
                {/*<CardSensor key={1} name={"Dissolved Oxygen (mg/L)"} value={latestDO} data={DO} />*/}
            </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
