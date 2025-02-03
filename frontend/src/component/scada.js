import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import { Stage, Layer, Rect, Text, Line, Circle } from "react-konva";
import Lottie from "react-lottie";
import * as kincirAnimation from "./kincir-animation.json";  // Ganti dengan path ke file animasi Lottie

const SCADADiagram = () => {
  // State untuk data sensor
  const [sensorData, setSensorData] = useState({
    suhu: 28.5,
    pH: 7.2,
    flowRate: 120,
    tangkiLevel: 50, // Level tangki awal 50%
  });

  useEffect(() => {
    // Konfigurasi MQTT
    const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt"); // Ganti dengan broker MQTT Anda

    client.on("connect", () => {
      console.log("Terhubung ke broker MQTT");
      client.subscribe("scada/sensor", (err) => {
        if (!err) {
          console.log("Berlangganan ke topic scada/sensor");
        }
      });
    });

    client.on("message", (topic, message) => {
      if (topic === "scada/sensor") {
        const data = JSON.parse(message.toString());
        setSensorData({
          suhu: data.suhu,
          pH: data.pH,
          flowRate: data.flowRate,
          tangkiLevel: data.tangkiLevel,
        });
      }
    });

    return () => client.end();
  }, []);

  // Opsi untuk animasi Lottie
  const kincirOptions = {
    loop: true,
    autoplay: true,  // Mengatur animasi untuk dimulai otomatis
    animationData: kincirAnimation,  // Menggunakan file animasi JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Sistem Monitoring SCADA Real-Time
      </h2>
      <Stage width={800} height={400}>
        <Layer>
          {/* Tangki Air 1 */}
          <Rect
            x={50}
            y={50}
            width={150}
            height={100}
            fill="#e0e0e0"
            cornerRadius={10}
          />
          <Rect
            x={50}
            y={150 - (sensorData.tangkiLevel / 100) * 100} // Dinamis sesuai dengan level air
            width={150}
            height={(sensorData.tangkiLevel / 100) * 100} // Sesuaikan tinggi air
            fill="rgba(0, 123, 255, 0.5)"
            cornerRadius={10}
          />
          <Text x={75} y={170} text={`Level: ${sensorData.tangkiLevel}%`} fontSize={14} fill="#000" />
          <Text x={75} y={190} text={`Suhu: ${sensorData.suhu}°C`} fontSize={12} fill="#000" />

          {/* Pipa ke Filter */}
          <Line
            points={[200, 100, 300, 100]}
            stroke="blue"
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
          />
          <Text x={220} y={90} text={`Flow: ${sensorData.flowRate} L/min`} fontSize={12} fill="#000" />

          {/* Filter */}
          <Rect
            x={300}
            y={50}
            width={150}
            height={100}
            fill="#e0e0e0"
            cornerRadius={10}
          />
          <Text x={320} y={120} text="Filter" fontSize={14} fill="#000" />
          <Text x={320} y={140} text={`pH: ${sensorData.pH}`} fontSize={12} fill="#000" />

          {/* Pipa ke Distribusi */}
          <Line
            points={[450, 100, 600, 100]}
            stroke="blue"
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
          />

          {/* Tangki Distribusi */}
          <Rect
            x={600}
            y={50}
            width={150}
            height={100}
            fill="#e0e0e0"
            cornerRadius={10}
          />
          <Rect
            x={600}
            y={150 - (sensorData.tangkiLevel / 100) * 100} // Dinamis sesuai dengan level air
            width={150}
            height={(sensorData.tangkiLevel / 100) * 100} // Sesuaikan tinggi air
            fill="rgba(0, 123, 255, 0.5)"
            cornerRadius={10}
          />
          <Text x={625} y={120} text="Distribusi" fontSize={14} fill="#000" />

          {/* Kincir (Lottie Animation) */}
          <Lottie
            options={kincirOptions}
            height={80}
            width={80}
            style={{ position: "absolute", left: "200px", top: "50px" }}
          />

          {/* Pompa */}
          <Rect
            x={500}
            y={250}
            width={50}
            height={30}
            fill="green"
            cornerRadius={5}
          />
          <Text x={510} y={255} text="Pompa" fontSize={14} fill="#000" />
        </Layer>
      </Stage>
    </div>
  );
};

export default SCADADiagram;
