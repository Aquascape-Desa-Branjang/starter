import { create } from "zustand"
import {axiosInstance} from "../lib/axios"
import {io} from "socket.io-client"

const BASE_URL = 'http://localhost:5000'

export const useAuthStore = create((set, get) => ({
    authAccount: null,
    socket: null,
    errorMessage: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authAccount: res.data});
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authAccount: null});
        }
    },

    login: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authAccount: res.data});

            get().connectSocket()
        } catch (error) {
            set({errorMessage: error.response.data.message});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});

            get().disconnectSocket()
        } catch (error) {
            set({errorMessage: error.response.data.message});
        }
    },

    connectSocket: () => {
        const socket = io(BASE_URL, {});
        socket.connect()
        set({socket: socket})
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect()
        }
    }
}))