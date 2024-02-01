import useAuthStore from "./utils/hooks/store/useAuthStore";
import { useEffect } from "react";
import { getUsersMe } from "./api/marketApi";
import { useLocation } from "react-router-dom";

/**
 * App 컴포넌트는 애플리케이션의 루트 컴포넌트입니다.
 * RouterProvider를 사용하여 라우터 설정을 적용합니다.
 *
 * @returns JSX.Element - 라우터 설정이 적용된 App 컴포넌트
 */
function App() {
  const { setUser, username } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) {
        // username이 없을 경우에만 API 호출
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
  }, [location, username]); // location과 username을 의존성 배열에 추가

  return <App />;
}

export default App;
