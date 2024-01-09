import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

/**
 * 'worker' 변수를 사용하여 Mock Service Worker(MSW)를 초기화합니다.
 * 이 worker는 로컬 개발 환경에서 네트워크 요청을 가로채고 목(mock) 데이터를 반환하는 데 사용됩니다.
 *
 * MSW는 API 요청을 가로채는 서버 측 로직을 브라우저에서 모방할 수 있게 해주는 도구입니다.
 * 이를 통해 실제 백엔드 서버 없이도 API 요청과 응답을 시뮬레이션할 수 있습니다.
 *
 * `handlers` 배열은 API 요청을 처리하는 핸들러 함수들을 포함하고 있습니다.
 * `setupWorker(...handlers)`는 이 핸들러들을 사용하여 MSW worker를 설정합니다.
 *
 * @returns {MSWWorker} - MSW worker 인스턴스를 반환합니다.
 */
export const worker = setupWorker(...handlers);
