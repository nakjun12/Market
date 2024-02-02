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
        await marketApi.post("/auth/logout");
      } catch (error) {
        console.error("Logout failed:", error);
      }
      // 클라이언트 상태 업데이트
      set({
        accessToken: null,
        isAuthenticated: false,
        userName: null,
        id: null,
        email: null
      });
    }
  }))
);

export default useAuthStore;
