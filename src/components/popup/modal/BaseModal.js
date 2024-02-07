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
