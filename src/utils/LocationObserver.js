import { useEffect } from "react";
import useAuthStore from "./hooks/store/useAuthStore";
import marketApi from "@/api/marketApi";

// 최상단에서 Url 라우팅 시 감지 및 변경
export function LocationObserver() {
  const { setAccessToken, setUser } = useAuthStore();

  useEffect(() => {
    // 첫 기동시 한번 refreshToken 체크
    const fetchUser = async () => {
      const { data } = await marketApi.post("/auth/refresh-token");
      if (data?.accessToken) {
        setAccessToken(data.accessToken);
        const userData = await marketApi.get("/users/me", {
          requiresAuth: true
        });
        setUser({ id: userData.data?.id, userName: userData.data?.username });
      }
    };
    fetchUser();
  }, []);

  // 실제 UI를 렌더링할 필요가 없으므로, null을 반환합니다.
  return null;
}
