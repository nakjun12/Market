import marketApi from "@/api/marketApi";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// 로그아웃 사용법
// const { logout } = useAuthStore();
// <div onClick={() => logout()}>Logout</div>

const useAuthStore = create(
  devtools((set) => ({
    accessToken: null,
    isAuthenticated: false,
    id: null,
    userName: null,
    email: null,
    setAccessToken: (token) =>
      set({ accessToken: token, isAuthenticated: true }),
    setUser: (newValues) =>
      set((state) => ({
        ...state, // 현재 상태를 유지
        ...newValues // 새로운 값으로 업데이트, 이 경우 userName만 업데이트하려는 경우에는 { userName: "새로운 값" }을 전달
      })),
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
