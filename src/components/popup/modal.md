# 모달 컴포넌트

## 개요

`Modal` 컴포넌트는 사용자 인터페이스에 팝업 형태의 UI를 제공합니다. 모달의 상태 관리를 위해 `useModalStore` 훅을 활용하며, `Popup` 컴포넌트를 사용하여 실제 모달 내용을 렌더링합니다.

### 핵심 기능

- **상태 관리**: `useModalStore` 훅을 통해 모달의 상태(예: 열림/닫힘 상태, 내용 등)를 관리합니다.
- **액션 처리**: 모달의 열기와 닫기 동작은 `useModalStore` 내의 `openModal` 및 `closeModal` 액션을 통해 처리됩니다.
- **백드롭 클릭**: `closeOnBackdrop` 속성에 따라 백드롭(모달 외부) 클릭 시 모달을 닫을지 결정합니다.

### 컴포넌트 구성

- `DefaultModal`: 기본 모달 컴포넌트로, 기본적인 모달 UI를 제공합니다.
- `AnotherModal`: 다양한 시나리오나 스타일에 맞춰 커스터마이징 가능한 추가 모달 컴포넌트입니다.

## 사용 방법

```jsx
import { useModalStore } from "@/utils/hooks/store/useModalStore";
import Modal from "@/components/popup/Modal";

const App = () => {
  const { openModal, closeModal } = useModalStore();

  const handleOpenModal = () => {
    openModal({
      modalType: "default",
      modalProps: {
        title: "가입에 성공했습니다.",
        message: "환영합니다!",
        confirmText: "확인",
        onConfirm: closeModal
      }
    });
  };

  return (
    <div>
      <button onClick={handleOpenModal}>모달 열기</button>
      <Modal />
    </div>
  );
};
```

위 예시는 `openModal` 함수를 사용하여 모달을 열고, 모달 내의 확인 버튼을 통해 `closeModal` 함수를 호출하여 모달을 닫는 과정을 보여줍니다.

## 컴포넌트 속성

- `isOpen`: 모달의 열림 및 닫힘 상태를 제어하는 불리언 값입니다.
- `modalType`: 렌더링할 모달 컴포넌트의 유형을 지정합니다. (`default`, `anotherModalType` 등)
- `modalProps`: 모달 컴포넌트로 전달될 속성들을 지정하는 객체입니다.
- `closeOnBackdrop`: 백드롭 클릭 시 모달을 닫을지 여부를 제어하는 불리언 값입니다.

## 추가 커스터마이제이션

모달 컴포넌트를 추가로 커스터마이즈하고자 한다면, `modalComponents` 객체에 새로운 모달 유형과 해당 컴포넌트를 정의하세요. 각 모달 컴포넌트는 필요에 따라 특정 스타일이나 기능을 포함할 수 있습니다.

이 문서는 `Modal` 컴포넌트의 주요 기능, 사용법, 속성 및 확장 방법에 대해 설명합니다. 필요에 따라 더 많은 세부 정보나 추가 섹션을 포함하여 문서를 확장할 수 있습니다.
