/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

/**
 * Dialog 컴포넌트는 독립적인 모달 대화 상자를 렌더링하는 데 사용됩니다.
 * 이 컴포넌트는 직접적으로 상태를 전달받아 모달을 렌더링하며,
 * 내부 상태 관리나 비즈니스 로직을 포함하지 않습니다.
 *
 * - `isOpen` prop을 통해 모달의 표시 여부를 제어합니다.
 * - `onBackdropClick` prop을 통해 백드롭 클릭 시 호출되는 함수를 전달할 수 있습니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.isOpen - 대화 상자가 열려 있는지 여부
 * @param {Function|null} props.onBackdropClick - 백드롭 클릭 시 호출되는 함수 또는 null
 * @param {React.ReactNode} props.children - 대화 상자 내부에 표시될 요소들
 * @returns {JSX.Element} React 요소를 반환합니다.
 */
export default function Dialog({ isOpen, onBackdropClick = null, children }) {
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
      // 스크롤을 허용하기 위해 body의 overflow를 unset으로 설정합니다.
      body.style.overflow = "unset";
    }

    // 배경을 클릭했을 때 대화 상자를 닫는 이벤트 핸들러입니다.
    const handleBackdropClick = (e) => {
      if (e.target === dialogRef.current && onBackdropClick) {
        onBackdropClick();
      }
    };

    if (onBackdropClick) {
      // onBackdropClick가 true일 때만 이벤트 리스너를 추가합니다.
      dialogRef.current.addEventListener("click", handleBackdropClick);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너를 정리합니다.
    return () => {
      if (onBackdropClick) {
        // 컴포넌트 언마운트 시 이벤트 리스너를 정리합니다.
        dialogRef.current.removeEventListener("click", handleBackdropClick);
      }
    };
  }, [isOpen]);

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

/**
 * 사용법:
 * 1. isOpen 상태를 정의하여 모달이 열려 있는지 여부를 제어합니다.
 * 2. onBackdropClick 함수를 정의하여 백드롭 클릭 시 모달을 닫는 로직을 구현합니다.
 * 3. Dialog 컴포넌트 안에 모달에 표시할 내용을 children으로 전달합니다.
 *
 * 예시:
 * ```jsx
 * const [isDialogOpen, setIsDialogOpen] = useState(false);
 *
 * const openDialog = () => setIsDialogOpen(true);
 *   const closeDialog = () => setIsDialogOpen(false);
 *
 * return (
 *   <div>
 *     <button onClick={penDialog}>모달 열기</button>
 *
 *      onBackdropClick은 백그라운드 클릭시 재생할 함수입니다
 *     <Dialog isOpen={isDialogOpen} onBackdropClick={closeDialog}>
 *       <div>모달 컨텐츠</div>
 *     </Dialog>
 *   </div>
 * );
 * ```
 */
