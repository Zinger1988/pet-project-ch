import React from 'react';
import Modal from './Modal';
import { Button } from '../../components';
import { useModal } from '../../context/ModalContext';

interface ConfirmModalProps {
  className?: string;
}

const AlertModal: React.FC<ConfirmModalProps> = ({ className = '' }) => {
  const modal = useModal();
  const { closeModal, header, body } = modal;

  return (
    <Modal id='alert'>
      <Modal.Head>{header}</Modal.Head>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Got it</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
