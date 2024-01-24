import { RouterProvider } from "react-router-dom";
import { routers } from "./router";
import useAuthStore from "./utils/hooks/store/useAuthStore";
import { useEffect } from "react";
import { getUsersMe } from "./api/marketApi";

/**
 * App 컴포넌트는 애플리케이션의 루트 컴포넌트입니다.
 * RouterProvider를 사용하여 라우터 설정을 적용합니다.
 *
 * @returns JSX.Element - 라우터 설정이 적용된 App 컴포넌트
 */
function App() {
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await getUsersMe();
        if (response.accessToken) {
          setAccessToken(response.accessToken);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };

    checkUserStatus();
  }, []);
  return <RouterProvider router={routers} />;
}

export default App;
