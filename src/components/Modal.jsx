import React from 'react';

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-message">{message}</div>
        <div className="modal-footer">
          <button className="btn-modal-confirm" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
