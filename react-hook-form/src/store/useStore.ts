import { createStore } from "zustand";
import { persist } from "zustand/middleware";

type Auth = {
    token: string;
    setToken: (tokenArg: string) => void;
    clearToken: () => void;
};

const useStore = createStore<Auth>()(
    persist(
        (set) => ({
            token: '',
            setToken: (tokenArg: string) => set({ token: tokenArg }),
            clearToken: () => set({ token: '' }),
        }),
        { name: 'auth-storage' },
    ),
)

export default useStore;