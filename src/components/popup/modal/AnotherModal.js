const AnotherModal = ({
  title,
  content,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소"
}) => {
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="py-4">{content}</p>
      <div className="modal-action">
        {onConfirm && (
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        )}
        {onCancel && (
          <button className="btn btn-secondary" onClick={onCancel}>
            {cancelText}
          </button>
        )}
      </div>
    </div>
  );
};

export default AnotherModal;
