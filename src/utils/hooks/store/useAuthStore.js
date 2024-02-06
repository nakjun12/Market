import marketApi from "@/api/marketApi";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 로그아웃 사용법
// const auth = useAuthStore();
// <div onClick={auth.logout}>Logout</div>

const useAuthStore = create(
  devtools((set) => ({
    accessToken: null,
    isAuthenticated: false,
    id: null,
    userName: null,
    email: null,
    setAccessToken: (token) =>
      set({ accessToken: token, isAuthenticated: true }),
    setUser: ({ id, userName, email }) => set({ id, userName, email }),
    logout: async () => {
      try {
        // 서버의 로그아웃 엔드포인트에 요청
        const res = await marketApi.post("/auth/logout");
        if (res.status === 200) {
          set({
            accessToken: null,
            isAuthenticated: false,
            userName: null,
            id: null,
            email: null
          });
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  }))
);

export default useAuthStore;
