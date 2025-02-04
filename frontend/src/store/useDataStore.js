import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from "./useAuthStore.js";

export const useDataStore = create((set, get) => ({
    graph: [],
    latestData: null,
    isValueLoading: false,
    isGraphLoading: false,

    getLatestData: async () => {
        set({ isValueLoading: true });
        try {
            const labelResponse = await axiosInstance.get('/displayitems/');
            const dataResponse = await axiosInstance.get('/displayitems/monitoring');

            // Create a mapping from parameter to displayName and unit
            const labelMap = labelResponse.data.reduce((acc, label) => {
                acc[label.parameter] = { displayName: label.displayName, unit: label.unit };
                return acc;
            }, {});

            // Transform data into the desired structure
            const transformedData = dataResponse.data.flatMap(dataItem => {
                return Object.keys(dataItem)
                    .filter(key => labelMap[key]) // Only include keys that exist in labelMap
                    .map(key => {
                        const { displayName, unit } = labelMap[key];
                        return [displayName, unit, dataItem[key]]; // Create the array structure
                    });
            });

            // Set the transformed data in the Zustand store
            set({ latestData: transformedData });
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
    }

}));
