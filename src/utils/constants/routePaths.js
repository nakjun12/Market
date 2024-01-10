/**
 * 애플리케이션 내의 주요 라우트 경로들을 정의한 객체입니다.
 * 이 객체는 Link 컴포넌트나 라우터 설정에서 활용됩니다.
 *
 * @type {{ [key: string]: string }}
 *
 * @example
 * // 라우트를 사용하는 예시
 * <Link to={ROUTES.HOME}>Home</Link>
 *
 * // 동적 라우트 파라미터를 사용하는 예시
 * <Route path={ROUTES.PRODUCT} component={ProductPage} />
 */
export const ROUTES = {
  HOME: "/", // 홈페이지 라우트
  LOGIN: "/login", // 로그인 페이지 라우트
  PRODUCT: "/product/:productid", // 개별 제품 상세 페이지 라우트 (동적 파라미터)
  PRODUCTS: "/products", // 제품 목록 페이지 라우트
  MYPAGE: "/mypage", // 사용자 마이페이지 라우트
  BASKET: "/Basket", // 장바구니 페이지 라우트
  TEST_COUNTER: "/test/counter", // 테스트용 카운터 페이지 라우트
  ALL_PRODUCTS: "/products/all", // 모든 제품 목록 페이지 라우트
  CATEGORY_PRODUCTS: "/products/:categoryId", // 카테고리별 제품 목록 페이지 라우트 (동적 파라미터)
  NOT_FOUND: "*", // 일치하는 라우트가 없을 때 표시될 페이지 (404 페이지 등)
  POST: "/post", // 게시물 생성 또는 표시 페이지 라우트
  TEST: "/test", // 테스트 페이지 라우트
  AUTH: "/auth" // 인증 관련 페이지 라우트
};
