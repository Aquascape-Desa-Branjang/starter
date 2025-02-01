import { create } from "zustand"
import {axiosInstance} from "../lib/axios"
import {io} from "socket.io-client"

const BASE_URL = 'http://localhost:5000'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authUser: res.data});
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
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