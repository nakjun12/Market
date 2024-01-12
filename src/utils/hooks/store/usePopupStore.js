// popupStore.js
import { create } from "zustand";

/**
 * Popup 관련 상태를 관리하는 zustand 스토어.
 *
 * @property {boolean} isOpen - 팝업이 열려 있는지 여부.
 * @property {React.ReactNode} content - 팝업 내에 렌더링할 컴포넌트.
 * @property {Function} openPopup - 팝업을 여는 함수. 컴포넌트를 인자로 받음.
 * @property {Function} closePopup - 팝업을 닫는 함수.
 */
const usePopupStore = create((set) => ({
  isOpen: false,
  content: null,
  openPopup: (content) => set({ isOpen: true, content }),
  closePopup: () => set({ isOpen: false, content: null })
}));

export default usePopupStore;
