import { useEffect } from "react";
import useAuthStore from "./hooks/store/useAuthStore";
import marketApi from "@/api/marketApi";

// 최상단에서 감지하는 함수 변경
export function LocationObserver() {
  const { setAccessToken, setUser, accessToken } = useAuthStore();

  useEffect(() => {
    // 첫 기동시 한번 refreshToken 체크, 이후 accessToken이 변경되면 체크
    const fetchRefresh = async () => {
      const { data } = await marketApi.post("/auth/refresh-token");
      if (data?.accessToken) {
        setAccessToken(data.accessToken);
      }
    };
    fetchRefresh();
  }, []);

  useEffect(() => {
    // 첫 기동시 한번 refreshToken 체크, 이후 accessToken이 변경되면 체크
    const fetchUser = async () => {
      const userData = await marketApi.get("/users/me", {
        requiresAuth: true
      });
      setUser({
        id: userData.data?.id,
        userName: userData.data?.username,
        email: userData.data?.email
      });
    };
    if (accessToken) {
      fetchUser();
    }
  }, [accessToken]);

  // 실제 UI를 렌더링할 필요가 없으므로, null을 반환합니다.
  return null;
}
