import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  isAuthenticated: false,
  setAccessToken: (token) =>
    set({ accessToken: token, isAuthenticated: !!token }),
  logout: () => set({ accessToken: null, isAuthenticated: false })
}));

export default useAuthStore;
