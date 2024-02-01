import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "./useAuthStore";
import { getUsersMe } from "@/api/marketApi";

export function LocationObserver() {
  const location = useLocation();
  const { setUser, username } = useAuthStore();

  useEffect(() => {
    console.log("경로 변경 감지:", location.pathname);
    // 여기에 사용자 정보를 불러오는 로직을 포함시킬 수 있습니다.
    const fetchUser = async () => {
      if (!username) {
        try {
          const response = await getUsersMe();
          if (response?.data) {
            const { id, username, accessToken } = response.data;
            setUser({ id, username, token: accessToken });
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };

    fetchUser();
  }, [location, username, setUser]);

  // 실제 UI를 렌더링할 필요가 없으므로, null을 반환합니다.
  return null;
}
