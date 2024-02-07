import { create } from "zustand";

/**
 * Popup 관련 상태를 관리하는 zustand 스토어.
 *
 * @property {boolean} isOpen - 팝업이 열려 있는지 여부.
 * @property {string} modalType - 현재 활성화된 모달의 타입.
 * @property {Object} modalProps - 현재 활성화된 모달에 전달될 props.
 * @property {boolean} closeOnBackdrop - 백드롭 클릭으로 팝업을 닫을지 여부.
 * @property {Function} openModal - 팝업을 여는 함수. 모달 타입과 모달 props, 백드롭 클릭 여부를 인자로 받음.
 * @property {Function} closeModal - 팝업을 닫는 함수.
 */
const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null, // 모달의 타입을 저장합니다.
  modalProps: {}, // 모달에 전달될 props를 저장합니다.
  closeOnBackdrop: true, // 기본값은 true로 설정
  openModal: ({ modalType, modalProps = {}, closeOnBackdrop = true }) =>
    set({ isOpen: true, modalType, modalProps, closeOnBackdrop }), // 모달 타입과 props를 설정합니다.
  closeModal: () =>
    set({
      isOpen: false,
      modalType: null,
      modalProps: {},
      closeOnBackdrop: true
    }) // 모달 상태를 초기화합니다.
}));

export default useModalStore;
