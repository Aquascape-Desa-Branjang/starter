import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from "./useAuthStore.js";

export const useDataStore = create((set, get) => ({
    graph: [],
    latestData: null,
    isValueLoading: false,
    isGraphLoading: false,

    // getLatestData: async () => {
    //     set({ isValueLoading: true });
    //     try {
    //         const labelResponse = await axiosInstance.get('/displayitems/');
    //         const dataResponse = await axiosInstance.get('/displayitems/monitoring');
    //
    //         // Create a mapping from parameter to displayName and unit
    //         const labelMap = labelResponse.data.reduce((acc, label) => {
    //             acc[label.parameter] = { displayName: label.displayName, unit: label.unit };
    //             return acc;
    //         }, {});
    //
    //         // Transform data into the desired structure
    //         const transformedData = dataResponse.data.flatMap(dataItem => {
    //             return Object.keys(dataItem)
    //                 .filter(key => labelMap[key]) // Only include keys that exist in labelMap
    //                 .map(key => {
    //                     const { displayName, unit } = labelMap[key];
    //                     return [displayName, unit, dataItem[key]]; // Create the array structure
    //                 });
    //         });
    //
    //         // Set the transformed data in the Zustand store
    //         set({ latestData: transformedData });
    //     } catch (error) {
    //         console.log("Error fetching data: ", error.message);
    //     } finally {
    //         set({ isValueLoading: false });
    //     }
    // },

    getLatestData: async () => {
        set({ isValueLoading: true });
        try {
            const response = await axiosInstance.get('/displayitems/monitoring/latest');
            set({ latestData: response.data });
        } catch (error) {
            console.log("Error fetching data: ", error.message);
        } finally {
            set({ isValueLoading: false });
        }
    },

    getGraph: async () => {
        set({ isGraphLoading: true })
        try {
            const res = await axiosInstance.get('/displayitems/monitoring/graph')
            set({graph: res.data})
        } catch (error) {
            console.log("Error fetching graph: ", error.message)
        } finally {
            set({isGraphLoading: false})
        }
    },

    update: async () => {
      const socket = useAuthStore.getState().socket

        try {
            const response  = await axiosInstance.get('/displayitems/')

            const data = get().latestData.map((item) => {

            })

            set({latestData: data})

            response.data.map(item => {
                socket.on(`${item.sensor + item.device + item.parameter}`, (newData) => {

                })
            })

        } catch (error) {

        }

    },

    subscribeSocket: () => {
        const socket = useAuthStore.getState().socket

        socket.on("newData", (newData) => {
            set({latestDO: newData})
            const DO = get().DO
            DO.pop()
            DO.unshift(newData)
            // DO.push(newData);
            // if (DO.length >= 10) {
            //     DO.shift(); // Remove the oldest data point if the array length exceeds 10
            // }
            set({ DO: DO });
            console.log(DO);
        })
    }
}));
