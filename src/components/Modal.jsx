import React from 'react';

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`bg-midnight-card border border-midnight-border rounded-default p-8 max-w-md w-full shadow-2xl transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white text-[1.1rem] font-medium leading-relaxed mb-8 text-center">
          {message}
        </div>
        <div className="flex justify-center">
          <button
            className="px-10 py-3 rounded-default bg-midnight-accent text-white font-bold hover:bg-midnight-accent/80 transition-all active:scale-[0.98] shadow-[0_4px_15px_rgba(168,85,247,0.3)]"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
