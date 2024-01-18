import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  setTokens: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken, isAuthenticated: true });
  },
  logout: () => {
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
  }
}));

export default useAuthStore;
