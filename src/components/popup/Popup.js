// Popup.js
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";

/**
 * Popup 컴포넌트는 UI를 받아서 popup-root div에 제공합니다.
 *
 * - isOpen: 팝업이 열려 있는지 여부를 나타냅니다.
 * - closePopup: 팝업을 닫는 함수입니다.
 * - children: 팝업 내부에 렌더링할 요소들입니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 props.
 * @param {boolean} props.isOpen - 팝업이 열려 있는지의 여부.
 * @param {Function} props.closePopup - 팝업을 닫는 함수.
 * @param {React.ReactNode} props.children - 팝업 내부에 렌더링될 요소들.
 * @returns {JSX.Element|null} 팝업 컴포넌트.
 */
const Popup = ({ isOpen, closePopup, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <Global
        styles={css`
          body {
            overflow: hidden; // 스크롤 방지
          }
        `}
      />
      {createPortal(
        <PopupBackdrop onClick={closePopup}>{children}</PopupBackdrop>,
        document.getElementById("popup-root") // 팝업을 렌더링할 DOM 노드를 지정합니다.
      )}
    </>
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
