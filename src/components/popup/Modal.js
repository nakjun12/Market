import useModalStore from "@/utils/hooks/store/useModalStore";
import styled from "@emotion/styled";
import Popup from "./Popup";

/**
 * Modal 컴포넌트는 팝업 UI를 제공합니다.
 * `useModalStore`를 사용하여 팝업 상태를 관리하며,
 * `Popup` 컴포넌트를 사용하여 모달을 렌더링합니다.
 *
 * @returns {JSX.Element} 모달 컴포넌트.
 */
export const Modal = () => {
  const { isOpen, content, closeOnBackdrop, closeModal } = useModalStore();

  const closePopup = closeOnBackdrop ? closeModal : null;
  return (
    <Popup isOpen={isOpen} closePopup={closePopup}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {content}
      </ModalContent>
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
 *   openModal(customContent);
 * };
 *
 * // 버튼 클릭 시 `openCustomPopup` 함수를 호출하여 팝업을 엽니다.
 * <button onClick={openCustomPopup}>Open Custom Popup</button>
 * ```
 *
 * 위 예시에서 `openModal` 함수는 사용자 정의 컨텐츠를 받아 모달을 열고,
 * `closeModal` 함수는 모달을 닫습니다.
 */
