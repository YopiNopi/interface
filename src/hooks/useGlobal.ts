import { create } from "zustand";

interface GlobalStore {
    user: {} | null;
}

interface IActions {
    setUser: (userInfo: {}) => void;
}

const useGlobal = create<GlobalStore & IActions>((set) => ({
    user: null,
    setUser: (userInfo) => set({ user: userInfo }),
}));

export default useGlobal;