### **프로젝트 명**: 파인 마켓 (당근마켓 클론)

### 1. 서론

**팀 소개 및 프로젝트 개요**

- 팀원: 유진(프론트엔드), 낙준(프론트엔드), 승훈(풀스택)
- 프로젝트 목적:  기술 습득 및 향상을 위한 미니 프로젝트
- 동기: 당근마켓의 유저 인터페이스와 기능을 모델로 삼아, 현대적인 기술 스택을 활용하여 유사한 서비스를 제작

**프로젝트 선정 배경**

- UI의 단순함과 더불어 구현 목표였던 기능이 다수 존재
- 최신 프론트엔드 기술을 활용한 실제 프로젝트 경험 축적

### 2. 프로젝트 관리 및 협업 방법

**코드 리뷰 및 회의 스케줄**

- 코드 리뷰: 매주 월, 수, 금 오후 3시 PR 리뷰 및 머지
- 주간 회의: 매주 한 번, 시간 미정 (주로 수요일에 진행)

**Branch 및 Commit 규칙**

- Branch 명명 규칙: **`feature/[기능명]`**
- Commit 메시지 규칙: **`feat: [기능 설명]`** (한글 사용 가능)

### 3. 기술 스택 및 도구

**기술 스택 소개**

- 프론트엔드
    
    # 코어
    
    ### Vite
    
    - **장점**: 빠른 핫 모듈 교체(HMR)와 빌드 속도, ES 모듈을 기반으로 한 현대적인 프로젝트 구조 제공.
    - **적용법**: 개발 의존성으로 Vite를 추가하고, **`vite.config.js`**를 통해 프로젝트 설정을 커스터마이징함.
    
    ### pnpm
    
    - **장점**: 디스크 공간 절약 및 빠른 설치 속도, 중복되는 패키지를 하드 링크로 관리하여 효율적.
    - **적용법**: 프로젝트 디렉토리에서 pnpm을 사용하여 의존성을 관리하고, **`pnpm-lock.yaml`** 파일로 일관된 패키지 버전 유지.
    
    # 비동기 통신
    
    ### Tanstack Query (React Query)
    
    - **장점**: 서버 상태 관리를 위한 강력한 도구, 데이터 캐싱, 백그라운드 업데이트, 데이터 동기화 등을 쉽게 구현.
    - **적용법**: API 호출을 위한 hook (**`useQuery`**, **`useMutation`**)을 사용하여 비동기 데이터를 처리하고, 컴포넌트에서 직접 데이터 상태와 캐싱을 관리.
    
    ### Axios
    
    - **장점**: 브라우저와 노드에서 모두 사용 가능한 HTTP 클라이언트, 요청 취소, 응답 시간 초과, HTTPs 지원.
    - **적용법**: 인스턴스를 생성하여 API 요청을 관리하고, 인터셉터를 사용하여 요청 및 응답을 전역적으로 처리.
    
    # 라우터
    
    ### React-Router
    
    - **장점**: SPA(Single Page Application)에서의 라우팅을 쉽게 구현, 동적 라우팅 지원.
    - **적용법**: **`BrowserRouter`**, **`Routes`**, **`Route`** 컴포넌트를 사용하여 애플리케이션 내의 라우팅 구조를 설정.
    
    # 상태관리
    
    ### Zustand
    
    - **장점**: 간결하고 가볍며, 설정이 적은 상태 관리 라이브러리. 리덕스보다 간단하게 상태 관리 가능.
    - **적용법**: 글로벌 상태 저장소를 생성하고, 컴포넌트에서 직접 사용하여 상태를 읽거나 업데이트함.
    
    # CSS (UI&UX)
    
    ### Emotion
    
    - **장점**: CSS-in-JS 라이브러리, 동적 스타일링 및 테마 지원, 높은 성능.
    - **적용법**: **`styled`** 컴포넌트를 사용하여 스타일을 직접 컴포넌트에 적용하거나, **`css`** prop을 사용하여 인라인 스타일링.
    
    ### DaisyUI
    
    - **장점**: Tailwind CSS 위에 구축된 UI 컴포넌트 라이브러리, 테마 지원 및 맞춤형 디자인 요소 제공.
    - **적용법**: Tailwind CSS 설정에 DaisyUI 플러그인을 추가하고, 제공되는 컴포넌트와 유틸리티 클래스를 활용하여 UI 구성.
    
    ### TailwindCSS
    
    - **장점**: 유틸리티 우선 CSS 프레임워크로 빠른 커스텀 디자인 가능, 반응형 디자인 쉽게 구현.
    - **적용법**: **`tailwind.config.js`**를 통해 프로젝트의 디자인 시스템을 정의하고, HTML 또는 JSX에 직접 유틸리티 클래스를 적용.
- 백엔드
    
    # 코어
    
    ### Nest.js
    
    - **장점**: Angular와 유사한 구조를 가진 Node.js 프레임워크로, 타입스크립트 지원, 효율적인 코드 조직, 모듈화 촉진.
    - **적용법**: 모듈, 컨트롤러, 서비스를 사용하여 RESTful API를 구성하고, 의존성 주입을 활용하여 유연성 및 테스트 용이성 제공.
    
    ### Prisma
    
    - **장점**: 타입스크립트 지원 ORM, 간편한 데이터베이스 스키마 마이그레이션 및 쿼리 구성.
    - **적용법**: **`schema.prisma`** 파일에서 데이터 모델을 정의하고, Prisma 클라이언트를 사용하여 데이터베이스와의 상호 작용을 쉽게 함.
    
    # DB
    
    ### PostgreSQL
    
    - **장점**: 강력한 오픈 소스 객체 관계형 데이터베이스 시스템, 복잡한 쿼리, 대용량 데이터 처리에 적합.
    - **적용법**: 데이터 저장, 검색, 관리를 위해 Prisma와 함께 사용하여 데이터 무결성 및 보안 유지.
    
    # 문서
    
    ### Swagger
    
    - **장점**: API 설계, 빌드, 문서화, 테스트를 위한 오픈 소스 프레임워크. 사용자 친화적인 문서 자동 생성.
    - **적용법**: Nest.js 프로젝트에 Swagger 모듈을 통합하여 API 엔드포인트에 대한 문서를 자동으로 생성하고 관리.
    
    # 배포
    
    ### Docker
    
    - **장점**: 애플리케이션을 컨테이너화하여 환경에 구애받지 않는 일관된 개발, 배포, 실행을 가능하게 함.
    - **적용법**: 개발 환경을 Docker 컨테이너로 구성하고, Docker Compose를 사용하여 멀티 컨테이너 애플리케이션을 관리.
- 선택 이유: 습득해보고 싶은 기술들과 사용해보고 싶은 기술 중심으로 선정

### 4. 프로젝트 주요 기능 및 개발 과정 (각 개발자)

**유진**

- 담당 기능: 메인 페이지와 검색 기능
- 개발 과정: 사용자 경험 중심의 디자인 및 캐싱 전략 구현, 재사용있는 컴포넌트 구현

**승훈**

- 담당 기능: 로그인/로그아웃, 헤더 및 푸터, 프로필 페이지, 백엔드 전반
- 개발 과정: 보안 강화 및 사용자 인터페이스 일관성 유지

**낙준**

- 담당 기능: 모달, 라우트 설정, 상세 페이지
- 개발 과정: 높은 퍼포먼스 유지를 위한 최적화 전략 구현

### 5. 발표 자료

### 황낙준

1. loader prefetch 활용
    
    [아이들나라 - Chrome 2023-10-18 13-05-31 (11).mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/9bd9f28b-e2ed-423c-9cfa-a908eb47dd3d/02796954-c5c8-4868-8ed1-bf6a9f41d82c/%EC%95%84%EC%9D%B4%EB%93%A4%EB%82%98%EB%9D%BC_-_Chrome_2023-10-18_13-05-31_(11).mp4)
    
    **Before**
    
    초기에 이미지가 없어서 레이아웃이 다시 잡힘
    
    [아이들나라 - Chrome 2023-10-18 13-05-31 (12).mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/9bd9f28b-e2ed-423c-9cfa-a908eb47dd3d/6fd2c687-09eb-4284-b162-480d14fa66ce/%EC%95%84%EC%9D%B4%EB%93%A4%EB%82%98%EB%9D%BC_-_Chrome_2023-10-18_13-05-31_(12).mp4)
    
    **After**
    
    초기에 이미지가 있어서 레이아웃을 잡고 시작함.
    
2. modal jsx → 객체 형식으로 전환

```jsx
* // `useModalStore`에서 필요한 함수를 가져옵니다.
 * const { openModal, closeModal } = useModalStore();
 *
 * // 팝업을 열기 위한 함수입니다.
 * const openCustomPopup = () => {
 *   const customContent = (
 *     <>
 *       <h2>Popup Title</h2>
 *       <p>Popup Content</p>
 *       <button onClick={closeModal}>Close Popup</button>
 *     </>
 *   );
 *   openModal(customContent); // 백드롭 클릭으로 팝업을 닫습니다.
 *  openModal(customContent, false); // 백드롭 클릭으로 팝업을 닫지 않습니다.
 * };
```

이전에는 직접 스타일을 넣어주어함. 

사람마다 넣는 모달 스타일이 달라서 재사용성이 아쉬움

```jsx
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
```

이후에는 modalType과 Props를 zustand를 통해 업데이트할 수 있게 하였음

```jsx
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
```

modalType을 modalComponent에 추가하여 이를 사용하는 방식으로 수정

```jsx
const BaseModal = (props) => {
  // props 객체에서 필요한 값들을 추출합니다.
  const {
    title,
    message,
    onConfirm,
    confirmText = "확인" // 기본값 설정
  } = props;

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="py-4">{message}</p>
      <div className="modal-action">
        <button className="btn" onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default BaseModal;
```

위와 같이 props를 받아주었음

1. JSDoc 작성 방식 수정

```jsx
//모달 컨텐츠 스타일 정의
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

/**
 * 사용 예시:
 *
 * 아래 예시는 `Modal` 컴포넌트를 사용하여 사용자 정의 팝업을 생성하고 열기/닫기 기능을 구현합니다.
 *
 * ```javascript
 * // `useModalStore`에서 필요한 함수를 가져옵니다.
 * const { openModal, closeModal } = useModalStore();
 *
 * // 팝업을 열기 위한 함수입니다.
 * const openCustomPopup = () => {
 *   const customContent = (
 *     <>
 *       <h2>Popup Title</h2>
 *       <p>Popup Content</p>
 *       <button onClick={closeModal}>Close Popup</button>
 *     </>
 *   );
 *   openModal(customContent); // 백드롭 클릭으로 팝업을 닫습니다.
 *  openModal(customContent, false); // 백드롭 클릭으로 팝업을 닫지 않습니다.
 * };
 *
 * // 버튼 클릭 시 `openCustomPopup` 함수를 호출하여 팝업을 엽니다.
 * <button onClick={openCustomPopup}>Open Custom Popup</button>
 * ```
 *
 * 위 예시에서 `openModal` 함수는 사용자 정의 컨텐츠를 받아 모달을 열고,
 * `closeModal` 함수는 모달을 닫습니다.
 */
```

**Before**

기존에는 하단에 작성하여서 jsdoc 이를 인지하지 못하였음

```jsx
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
```

**After**

수정 이후에는 JSDoc 문법에 맞게 작성하였음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9bd9f28b-e2ed-423c-9cfa-a908eb47dd3d/07dc3160-a005-45ed-9300-9133a4bf0048/Untitled.png)

하지만, JSDoc을 작성하는 것도 좋지만, 사용할 줄 아는 사람 입장에서는 설명문이 있는 것이 번거로울 수 있다고 생각하여서

```markdown
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
```

다음에는 md파일로 작성하는 것을 고려해보는게 좋을 것 같습니다.

---

### 6. 질문사항 및 Q&A
