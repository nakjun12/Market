/**
 * 지정된 시간 후에 주어진 컴포넌트를 로드하기 위한 Promise를 반환합니다.
 * 이 함수는 React의 Suspense와 함께 사용되어, 지정된 시간 동안 컴포넌트 로드를 지연시킵니다.
 * 지정한 시간이 없다면 로드하지 않아서 Suspense가 무한대로 발동합니다.
 *
 * @param {Promise} component - 동적으로 로드할 컴포넌트의 Promise.
 * @param {number} [timeout] - 컴포넌트 로드를 지연시킬 시간(밀리초). 지정하지 않으면 무한 대기.
 * @returns {Promise} 주어진 시간 이후에 컴포넌트를 로드하는 Promise.
 */
export const SuspenseController = (component, timeout) => {
  return new Promise((resolve) => {
    if (timeout) {
      setTimeout(() => {
        resolve(component);
      }, timeout);
    }
  });
};

/**
 * 지연된 로딩 후에 표시될 컴포넌트입니다.
 * 이 컴포넌트는 `SuspenseController` 함수와 함께 사용되어,
 * 지정된 시간 동안 로딩 상태를 표시한 후 실제 컨텐츠를 렌더링합니다.
 *
 * @returns JSX.Element - 로딩 완료 후 렌더링되는 컴포넌트.
 */
const DelayedComponent = () => {
  return <div>Component has been loaded</div>;
};

export default DelayedComponent;

/**
 * 사용 방법:
 *
 * `SuspenseController` 함수와 `React.lazy`를 사용하여 `DelayedComponent`의 로드를 지연시킵니다.
 * 예를 들어, 아래와 같이 컴포넌트를 사용할 수 있습니다:
 *
 * ```javascript
 * import React, { Suspense, lazy } from 'react';
 * import { SuspenseController } from './SuspenseController';
 *
 * // `DelayedComponent`를 지연 로드하기 위해 `React.lazy`와 `SuspenseController` 함수를 사용합니다.
 * const DelayedComponentWithDelay = lazy(() =>
 *   SuspenseController(import('./DelayedComponent'), 3000)
 * );
 *
 *     <Suspense fallback={<div>Loading...</div>}>
 *       <DelayedComponentWithDelay />
 *     </Suspense>
 *
 *
 * 이 예시에서 `DelayedComponentWithDelay`는 3000 밀리초(3초) 후에 로드됩니다.
 * 이 기간 동안 `Suspense`의 `fallback` 컴포넌트가 "Loading..."을 표시합니다.
 */
