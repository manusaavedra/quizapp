import { create } from "zustand";

export const useScoreStore = create((set)=> ({
    success: 0,
    failed: 0,
    onSuccess: () => {
        set((state) => ({success: state.success + 1}))
    },
    onFailed: () => {
        set((state) => ({failed: state.failed + 1}))
    }
}))