// NotFoundPage와 ProductPage 컴포넌트를 임포트합니다.
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/product/ProductsPage";

// 코드 스플리팅을 위해 React.lazy를 사용하는 주석 처리된 예시입니다.
// 현재는 직접 임포트를 사용하고 있지만, 나중에 필요시 아래의 코드로 대체할 수 있습니다.
// const ProductPage = React.lazy(() => import("Pages/ProductPage"));
// 추후 코드 스플리팅을 대비하여 미리 세팅하였음

// 라우트 경로들을 정의한 객체입니다.
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PRODUCT: "/product/:productid",
  PRODUCTS: "/products",
  MYPAGE: "/mypage",
  BASKET: "/Basket",
  TEST_COUNTER: "/test/counter",
  ALL_PRODUCTS: "/products/all",
  CATEGORY_PRODUCTS: "/products/:categoryId",
  NOT_FOUND: "*",
  POST: "/post",
  TEST: "/test",
  AUTH: "/auth"
};

// 라우트 설정을 정의한 배열입니다.
// 각 라우트에 대한 경로와 해당 경로에서 렌더링할 컴포넌트를 지정합니다.
export const routeConfig = [
  // 홈 페이지 경로, ProductPage 컴포넌트를 렌더링합니다.
  // `index: true`는 이 라우트가 자식 라우트보다 우선순위가 높음을 나타냅니다.
  { path: ROUTES.HOME, element: <ProductPage />, index: true },

  // 404 Not Found 페이지 경로, NotFoundPage 컴포넌트를 렌더링합니다.
  // 와일드카드('*') 경로를 사용하여 예상치 못한 모든 경로에서 NotFoundPage를 띄웁니다.
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> }
];
