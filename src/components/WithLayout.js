import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { SuspenseController } from "./SuspenseController";
import Footer from "./footer";
import Header from "./header";
import { LocationObserver } from "@/utils/LocationObserver";

const DelayedComponent = lazy(() =>
  SuspenseController(import("./SuspenseController"), 3000)
);

const Modal = lazy(() => import("./popup/Modal"));
/**
 * WithLayout 컴포넌트는 애플리케이션의 공통 레이아웃을 제공합니다.
 * 이 컴포넌트는 페이지의 헤더와 푸터를 포함하고, 중앙에는 Outlet을 통해
 * 하위 페이지의 내용을 렌더링합니다.
 *
 * Suspense 컴포넌트는 하위 컴포넌트의 로드를 대기하고, 로드 중에는 fallback을 보여줍니다.
 * Outlet 컴포넌트는 중첩된 라우트의 컴포넌트를 해당 위치에 렌더링하는 데 사용됩니다.
 *
 * @returns JSX.Element - 공통 레이아웃이 적용된 페이지 요소를 반환합니다.
 */
export default function WithLayout() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <LocationObserver />
      <Header />
      <Suspense fallback={<div>대기중</div>}>
        <Modal />
        {/* <DelayedComponent /> */}
        {/* Outlet 컴포넌트는 현재 경로에 매칭되는 중첩된 라우트의 컴포넌트를 렌더링합니다.
            이는 React Router의 중첩된 라우팅 구조를 활용하는데 중요한 역할을 합니다.
            예시로 router.js routeConfig의 element를 넣습니다.
            */}
        <div className="h-full">
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
}
