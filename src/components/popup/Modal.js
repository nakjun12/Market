import usePopupStore from "@/utils/hooks/store/usePopupStore";
import styled from "@emotion/styled";
import Popup from "./Popup";

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

/**
 * Modal 컴포넌트는 팝업 UI를 제공합니다.
 * `usePopupStore`를 사용하여 팝업 상태를 관리하며,
 * `Popup` 컴포넌트를 사용하여 모달을 렌더링합니다.
 *
 * @returns {JSX.Element} 모달 컴포넌트.
 */
export const Modal = () => {
  const { isOpen, content, closePopup } = usePopupStore();

  return (
    <Popup isOpen={isOpen} closePopup={closePopup}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {content}
      </ModalContent>
    </Popup>
  );
};
