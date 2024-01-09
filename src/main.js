// 필요한 React Query와 ReactDOM 라이브러리를 임포트합니다.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
// 앱의 메인 컴포넌트인 App을 임포트합니다.
import App from "./App";
// 스타일시트를 임포트합니다.
import "./styles/index.css";

// React Query 클라이언트를 초기화합니다.
// 이 클라이언트는 데이터 페칭 및 캐싱을 관리합니다.
const queryClient = new QueryClient();

// Mock Service Worker(MSW)를 활성화하는 함수입니다.
// 개발 중 API 모킹을 위해 사용됩니다.
async function enableMocking() {}

// 애플리케이션을 마운트할 DOM 노드를 찾아서 루트를 생성합니다.
const root = ReactDOM.createRoot(document.getElementById("root"));

// MSW를 활성화하고, 이후에 App 컴포넌트를 렌더링합니다.
// MSW는 네트워크 요청을 가로채고 목 데이터를 반환하는 라이브러리입니다.
enableMocking().finally(() => {
  // QueryClientProvider를 사용하여 React Query 클라이언트를 제공합니다.
  // 이를 통해 하위 컴포넌트에서 React Query의 기능을 사용할 수 있습니다.
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
});
