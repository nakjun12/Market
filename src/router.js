import WithLayout from "@/components/WithLayout";
import Header from "@/components/header";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductsPage from "@/pages/product/ProductsPage";
import { ROUTES } from "@/utils/constants/routePaths";
import { createBrowserRouter } from "react-router-dom";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import ProductsSearchPage from "./pages/search/ProductsSearchPage";
import ProductsSearchResult from "./pages/search/ProductSearchResult";
import { LoginPage } from "./pages/login/LoginPage";
import { JoinPage } from "./pages/join/JoinPage";

// 코드 스플리팅을 위해 React.lazy를 사용하는 주석 처리된 예시입니다.
// 현재는 직접 임포트를 사용하고 있지만, 나중에 필요시 아래의 코드로 대체할 수 있습니다.
// const ProductPage = React.lazy(() => import("Pages/ProductPage"));
// 추후 코드 스플리팅을 대비하여 미리 세팅하였음

// 라우트 설정을 정의한 배열입니다.
// 각 라우트에 대한 경로와 해당 경로에서 렌더링할 컴포넌트를 지정합니다.
export const routeConfig = [
  // 홈 페이지 경로, ProductPage 컴포넌트를 렌더링합니다.
  // `index: true`는 이 라우트가 자식 라우트보다 우선순위가 높음을 나타냅니다.
  { path: ROUTES.HOME, element: <ProductsPage />, index: true },
  { path: ROUTES.PRODUCT, element: <ProductDetailPage /> },
  { path: ROUTES.SEARCH, element: <ProductsSearchPage /> },
  { path: ROUTES.SEARCH_RESULT, element: <ProductsSearchResult /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.JOIN, element: <JoinPage /> },

  // 404 Not Found 페이지 경로, NotFoundPage 컴포넌트를 렌더링합니다.
  // 와일드카드('*') 경로를 사용하여 예상치 못한 모든 경로에서 NotFoundPage를 띄웁니다.
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> }
];

/**
 * 라우터 설정을 생성합니다. 이 설정은 앱 전체의 페이지 라우팅 구조를 정의합니다.
 *
 * @returns {Router} - React Router v6에서 사용할 라우터 객체입니다.
 */
export const routers = createBrowserRouter([
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
