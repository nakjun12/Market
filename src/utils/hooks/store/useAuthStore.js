import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 로그아웃 사용법
// const auth = useAuthStore();
// <div onClick={auth.logout}>Logout</div>

const useAuthStore = create(
  devtools((set) => ({
    accessToken: null,
    isAuthenticated: false,
    setAccessToken: (token) =>
      set({ accessToken: token, isAuthenticated: !!token }),
    logout: () => set({ accessToken: null, isAuthenticated: false })
  }))
);

export default useAuthStore;
