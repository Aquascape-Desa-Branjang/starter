import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import {useAuthStore} from "./useAuthStore.js";

export const useDOStore = create((set, get) => ({
    DO: [],
    latestDO: null,

    getDO: async () => {
        try {
            const res = await axiosInstance.get('/dissolvedoxygen/graph')
            // const array = res.data.map(DO => DO.oksigen_terlarut)
            // set({DO: array})
            // console.log(res.data)
            if (Array.isArray(res.data)) {
                const array = res.data.map(DO => DO.oksigen_terlarut);
                set({ DO: array });
            } else {
                console.error("Expected an array but got:", res.data);
            }
        } catch (error) {
            console.log("Error in getDO:", error.message)
        } finally {

        }
    },

    getLatestDO: async () => {
      try {
          const res = await axiosInstance.get('/dissolvedoxygen/')
          // const data = await response.json();
          // setDO({value: data[0].oksigen_terlarut});
          set({latestDO: res.data[0].oksigen_terlarut})
      } catch(error) {
          console.log("Error in getLatestDO: ", error.message )
      } finally {

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
}))