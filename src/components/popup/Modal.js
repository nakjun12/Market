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
