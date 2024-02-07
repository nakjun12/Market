import useModalStore from "@/utils/hooks/store/useModalStore";
import { lazy } from "react";
import Popup from "./Popup";

const DefaultModal = lazy(() => import("./modal/BaseModal"));
const AnotherModal = lazy(() => import("./modal/AnotherModal"));

const modalComponents = {
  default: DefaultModal,
  anotherModalType: AnotherModal
  // 다른 모달 타입에 대한 정의를 추가할 수 있습니다.
};

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
 *
 * @example
 * // 사용법 예시:
 * const { openModal, closeModal } = useModalStore();
 *
 * // 커스텀 팝업 열기
 * openModal({
 *   modalType: "default",
 *   modalProps: {
 *     title: `가입에 성공했습니다.`,
 *     message,
 *     confirmText: "확인",
 *     onConfirm: closeModal
 *   }
 * });
 */
const Modal = () => {
  const { isOpen, modalType, modalProps, closeOnBackdrop, closeModal } =
    useModalStore();

  const closePopup = closeOnBackdrop ? closeModal : null;

  const SelectedModal = modalComponents[modalType] || modalComponents.default;

  return (
    <Popup isOpen={isOpen} closePopup={closePopup}>
      <SelectedModal {...modalProps} />
    </Popup>
  );
};

export default Modal;
