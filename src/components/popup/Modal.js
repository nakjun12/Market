import useModalStore from "@/utils/hooks/store/useModalStore";
import styled from "@emotion/styled";
import Popup from "./Popup";

/**
 * Modal 컴포넌트는 팝업 UI를 제공합니다.
 * 이 컴포넌트는 `useModalStore` 훅을 사용하여 팝업의 상태를 관리하며,
 * `Popup` 컴포넌트를 사용하여 실제 모달을 렌더링합니다.
 *
 * - `useModalStore`를 통해 모달의 상태(isOpen, content 등)를 관리합니다.
 * - 모달을 열고 닫는 동작은 `useModalStore`의 액션(openModal, closeModal)을 통해 수행됩니다.
 * - 백드롭 클릭으로 모달을 닫는 동작은 `closeOnBackdrop` 상태에 따라 결정됩니다.
 *
 * 이 컴포넌트는 훅을 통한 상태 관리와 컴포넌트 렌더링을 분리하는 방식을 사용합니다.
 *
 * @returns {JSX.Element} 모달 컴포넌트.
 */
export const Modal = () => {
  const { isOpen, content, closeOnBackdrop, closeModal } = useModalStore();

  const closePopup = closeOnBackdrop ? closeModal : null;
  return (
    <Popup
      isOpen={isOpen}
      closePopup={closePopup}
      onClick={(e) => e.stopPropagation()}>
      {content}
    </Popup>
  );
};

//모달 컨텐츠 스타일 정의
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

/**
 * 사용 예시:
 *
 * 아래 예시는 `Modal` 컴포넌트를 사용하여 사용자 정의 팝업을 생성하고 열기/닫기 기능을 구현합니다.
 *
 * ```javascript
 * // `useModalStore`에서 필요한 함수를 가져옵니다.
 * const { openModal, closeModal } = useModalStore();
 *
 * // 팝업을 열기 위한 함수입니다.
 * const openCustomPopup = () => {
 *   const customContent = (
 *     <>
 *       <h2>Popup Title</h2>
 *       <p>Popup Content</p>
 *       <button onClick={closeModal}>Close Popup</button>
 *     </>
 *   );
 *   openModal(customContent); // 백드롭 클릭으로 팝업을 닫습니다.
 *  openModal(customContent, false); // 백드롭 클릭으로 팝업을 닫지 않습니다.
 * };
 *
 * // 버튼 클릭 시 `openCustomPopup` 함수를 호출하여 팝업을 엽니다.
 * <button onClick={openCustomPopup}>Open Custom Popup</button>
 * ```
 *
 * 위 예시에서 `openModal` 함수는 사용자 정의 컨텐츠를 받아 모달을 열고,
 * `closeModal` 함수는 모달을 닫습니다.
 */
