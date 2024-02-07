import { useEffect } from "react";
import useAuthStore from "./hooks/store/useAuthStore";
import marketApi from "@/api/marketApi";

// 최상단에서 첫 로드, accessToken을 감시하는 함수
export function LocationObserver() {
  const { setAccessToken, setUser, accessToken } = useAuthStore();

  useEffect(() => {
    // 첫 화면 로드시 refreshToken 체크
    const fetchRefresh = async () => {
      try {
        const { data } = await marketApi.post("/auth/refresh-token");
        if (data?.accessToken) {
          setAccessToken(data.accessToken);
        }
      } catch (error) {
        // 401 Unauthorized 에러일 경우 콘솔에 에러를 출력하지 않음
        if (error.response?.status !== 401) {
          console.error(error);
        }
        // 필요한 경우 여기에 리프레시 토큰 실패에 대한 추가적인 처리 로직을 구현할 수 있습니다.
      }
    };
    fetchRefresh();
  }, []);

  useEffect(() => {
    // accessToken이 새로 추가되거나 변경되면 개인 정보 갱신
    const fetchUser = async () => {
      if (accessToken) {
        try {
          const userData = await marketApi.get("/users/me", {
            requiresAuth: true
          });
          setUser({
            id: userData.data?.id,
            userName: userData.data?.username,
            email: userData.data?.email
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUser();
  }, [accessToken]);

  // 실제 UI를 렌더링할 필요가 없으므로, null을 반환합니다.
  return null;
}
