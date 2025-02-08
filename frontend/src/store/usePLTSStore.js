import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from "./useAuthStore.js";

export const usePLTSStore = create((set, get) => ({
    VFD: [],              // Menyimpan array data output_power dari VFD
    latestVFD: null,      // Menyimpan data terbaru dari output_power VFD
    InverterSRNE: [],     // Menyimpan array data pv_power dan battery_level dari InverterSRNE
    latestInverterSRNE: null, // Menyimpan data terbaru dari pv_power dan battery_level

    // Fungsi untuk mengambil data VFD (10 data terakhir)
    getVFD: async () => {
        try {
            const res = await axiosInstance.get('/vfd/graph');
            if (Array.isArray(res.data)) {
                const array = res.data.map(VFD => VFD.output_power);
                set({ VFD: array });
            } else {
                console.error("Expected an array but got:", res.data);
            }
        } catch (error) {
            console.log("Error in getVFD:", error.message);
        }
    },

    // Fungsi untuk mengambil data terbaru VFD
    getLatestVFD: async () => {
        try {
            const res = await axiosInstance.get('/vfd/');
            set({latestVFD: {
                    output_power: res.data[0].output_power
                }})
        } catch (error) {
            console.log("Error in getLatestVFD:", error.message);
        }
    },

    // Fungsi untuk mengambil data InverterSRNE (10 data terakhir)
    getInverterSRNE: async () => {
        try {
            const res = await axiosInstance.get('/InverterSRNE/graph');
            if (Array.isArray(res.data)) {
                const array = res.data.map(inverter => ({
                    pv_power: inverter.pv_power,
                    battery_level: inverter.battery_level
                }));
                set({ InverterSRNE: array });
            } else {
                console.error("Expected an array but got:", res.data);
            }
        } catch (error) {
            console.log("Error in getInverterSRNE:", error.message);
        }
    },

    // Fungsi untuk mengambil data terbaru InverterSRNE
    getLatestInverterSRNE: async () => {
        try {
            const res = await axiosInstance.get('/InverterSRNE/');
            if (Array.isArray(res.data) && res.data.length > 0) {
                set({
                    latestInverterSRNE: {
                        pv_power: res.data[0].pv_power,
                        battery_level: res.data[0].battery_level
                    }
                });
            } else {
                console.error("No data found for InverterSRNE.");
            }
        } catch (error) {
            console.log("Error in getLatestInverterSRNE:", error.message);
        }
    },

    // Fungsi untuk mendengarkan pembaruan data via WebSocket
    subscribeSocket: () => {
        const socket = useAuthStore.getState().socket;

        // Hindari duplikasi listener
        socket.off("newDataVFD");
        socket.off("newDataInverterSRNE");

        // Pembaruan data untuk VFD
        socket.on("newDataVFD", (newData) => {
            if (newData?.output_power) {
                set((state) => {
                    const updatedVFD = [...state.VFD];
                    updatedVFD.unshift(newData.output_power);
                    if (updatedVFD.length > 10) updatedVFD.pop();
                    return { latestVFD: newData.output_power, VFD: updatedVFD };
                });
                console.log("Updated VFD Data:", newData.output_power);
            }
        });

        // Pembaruan data untuk InverterSRNE
        socket.on("newDataInverterSRNE", (newData) => {
            if (newData?.pv_power || newData?.battery_level) {
                set((state) => {
                    const updatedInverterSRNE = [...state.InverterSRNE];
                    updatedInverterSRNE.unshift({
                        pv_power: newData.pv_power,
                        battery_level: newData.battery_level
                    });
                    if (updatedInverterSRNE.length > 10) updatedInverterSRNE.pop();
                    return {
                        latestInverterSRNE: {
                            pv_power: newData.pv_power,
                            battery_level: newData.battery_level
                        },
                        InverterSRNE: updatedInverterSRNE
                    };
                });
                console.log("Updated InverterSRNE Data:", newData);
            }
        });
    },
}));
