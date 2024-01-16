/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

/**
 * Dialog 컴포넌트는 모달 대화 상자를 렌더링합니다.
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.isOpen - 대화 상자가 열려 있는지 여부
 * @param {Function} props.onClose - 대화 상자를 닫을 때 호출되는 함수
 * @param {React.ReactNode} props.children - 대화 상자 내부에 표시될 요소들
 * @returns {JSX.Element} React 요소를 반환합니다.
 */
export default function Dialog({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      // 대화 상자를 모달로 표시합니다.
      dialogRef.current.showModal();
      // 스크롤을 방지하기 위해 body의 overflow를 hidden으로 설정합니다.
      body.style.overflow = "hidden";
    } else {
      // 대화 상자를 닫습니다.
      dialogRef.current.close();
      console.log("반응했음");
      // 스크롤을 허용하기 위해 body의 overflow를 unset으로 설정합니다.
      body.style.overflow = "unset";
    }

    // 배경을 클릭했을 때 대화 상자를 닫는 이벤트 핸들러입니다.
    const handleBackdropClick = (e) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    };

    dialogRef.current.addEventListener("click", handleBackdropClick);

    // 컴포넌트 언마운트 시 이벤트 리스너를 정리합니다.
    return () => {
      dialogRef.current.removeEventListener("click", handleBackdropClick);
    };
  }, [isOpen, onClose]);

  return (
    <dialog ref={dialogRef} css={dialogStyle(isOpen)}>
      {children}
    </dialog>
  );
}

/**
 * 스타일을 정의하는 함수. isOpen 상태에 따라 dialog의 CSS를 조정합니다.
 * @param {boolean} isOpen - 대화 상자가 열려 있는지 여부를 나타냅니다.
 * @returns {SerializedStyles} Emotion CSS 객체를 반환합니다.
 */
const dialogStyle = (isOpen) => css`
  display: ${isOpen ? "block" : "none"};

  &::backdrop {
    background: #fff5;
    backdrop-filter: blur(4px);
  }
  /* 여기에 필요한 다른 dialog 스타일을 추가할 수 있습니다 */
`;
