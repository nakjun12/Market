// Popup.js
import styled from "@emotion/styled";
import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Popup 컴포넌트는 모달 형태의 팝업 UI를 제공합니다.
 * 이 컴포넌트는 'isOpen', 'closePopup', 'children' 등의 props를 받아서 처리합니다.
 *
 * - isOpen: 팝업이 열려 있는지 여부를 나타냅니다.
 * - closePopup: 팝업을 닫는 함수입니다.
 * - children: 팝업 내부에 렌더링될 요소들입니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 props.
 * @param {boolean} props.isOpen - 팝업이 열려 있는지의 여부.
 * @param {Function} props.closePopup - 팝업을 닫는 함수.
 * @param {React.ReactNode} props.children - 팝업 내부에 렌더링될 요소들.
 * @returns {JSX.Element|null} 팝업 컴포넌트.
 */
const Popup = ({ isOpen, closePopup, children }) => {
  useEffect(() => {
    // 팝업이 열려 있을 때 body 스크롤을 막습니다.
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      // 컴포넌트가 언마운트될 때 스크롤을 다시 허용합니다.
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    // 팝업 배경을 클릭하면 팝업을 닫습니다.
    <PopupBackdrop onClick={closePopup}>{children}</PopupBackdrop>,
    document.getElementById("popup-root") // 팝업을 렌더링할 DOM 노드를 지정합니다.
  );
};

export default Popup;

const PopupBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
