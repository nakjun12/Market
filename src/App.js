import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WithLayout from "./components/WithLayout.js";
import Header from "./components/header/index.js";
import { ROUTES, routeConfig } from "./router.js";

/**
 * 라우터 설정을 생성합니다. 이 설정은 앱 전체의 페이지 라우팅 구조를 정의합니다.
 *
 * @returns {Router} - React Router v6에서 사용할 라우터 객체입니다.
 */
const routers = createBrowserRouter([
  {
    // 홈 페이지 라우트 설정
    path: ROUTES.HOME,
    label: "WithLayoutPage",
    element: <WithLayout />,
    // errorElement: <Empty />, // 에러 발생 시 보여줄 컴포넌트 (옵션)
    children: routeConfig // WithLayout 컴포넌트를 감싸는 하위 페이지 라우트
  },
  {
    // WithLayout 없이 사용하는 페이지 라우트 예시
    path: ROUTES.TEST,
    label: "withOutLayOutPage",
    element: <Header />
    // errorElement: <Empty />, // 에러 발생 시 보여줄 컴포넌트 (옵션)
  }
]);

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

// 아래 주석 처리된 코드는 라우터 설정을 확장하는 예시입니다.
// 어드민 전용 페이지나 인증이 필요한 페이지 등 특정 조건에 따라
// 라우트를 다르게 설정할 수 있습니다.
// export const routers: RemixRouter = createBrowserRouter(
//   routerData.map((router) => {
//     if (router.withAuth) {
//       return {
//         path: router.path,
//         element: <GeneralLayout>{ router.element }</GeneralLayout>
//       }
//     } else {
//       return {
//         path: router.path,
//         element: router.element
//       }
//     }
//   })
// )
