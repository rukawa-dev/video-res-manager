import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Modal from './components/Modal';

function App() {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, message: '', onConfirm: null });

  const showModal = (message, onConfirm = null) => {
    setModalConfig({ isOpen: true, message, onConfirm });
  };

  const closeModal = () => {
    if (modalConfig.onConfirm) modalConfig.onConfirm();
    setModalConfig({ isOpen: false, message: '', onConfirm: null });
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage showModal={showModal} />} />
        <Route path="/detail/:id" element={<DetailPage showModal={showModal} />} />
      </Routes>
      <Modal
        isOpen={modalConfig.isOpen}
        message={modalConfig.message}
        onClose={closeModal}
      />
    </Router>
  );
}

export default App;
