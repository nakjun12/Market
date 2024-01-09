import { create } from "zustand";

//zustand 예시
export const useStore = create((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 }))
}));
