// popupStore.js
import { create } from "zustand";

/**
 * Popup 관련 상태를 관리하는 zustand 스토어.
 *
 * @property {boolean} isOpen - 팝업이 열려 있는지 여부.
 * @property {React.ReactNode} content - 팝업 내에 렌더링할 컴포넌트.
 * @property {boolean} closeOnBackdrop - 백드롭 클릭으로 팝업을 닫을지 여부.
 * @property {Function} openModal - 팝업을 여는 함수. 컴포넌트와 백드롭 클릭 여부를 인자로 받음.
 * @property {Function} closeModal - 팝업을 닫는 함수.
 */
const useModalStore = create((set) => ({
  isOpen: false,
  content: null,
  closeOnBackdrop: true, // 기본값은 true로 설정
  openModal: (content, closeOnBackdrop = true) =>
    set({ isOpen: true, content, closeOnBackdrop }),
  closeModal: () => set({ isOpen: false, content: null, closeOnBackdrop: true })
}));

export default useModalStore;
