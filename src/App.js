import { RouterProvider } from "react-router-dom";
import { routers } from "./router";
/**
 * App 컴포넌트는 애플리케이션의 루트 컴포넌트입니다.
 * RouterProvider를 사용하여 라우터 설정을 적용합니다.
 *
 * @returns JSX.Element - 라우터 설정이 적용된 App 컴포넌트
 */
function App() {
  return <RouterProvider router={routers} />;
}

export default App;
