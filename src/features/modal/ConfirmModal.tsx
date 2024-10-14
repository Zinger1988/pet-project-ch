import React from 'react';
import Modal from './Modal';
import { Button } from '../../components';
import { useModal } from '../../context/ModalContext';

interface ConfirmModalProps {
  className?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ className = '' }) => {
  const modal = useModal();
  const { closeModal, callbacks, header, body } = modal;
  const onConfirm = callbacks?.onConfirm;
  const onCancel = callbacks?.onCancel;

  const handleConfirm = () => {
    onConfirm && onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    onCancel && onCancel();
    closeModal();
  };

  return (
    <Modal id='confirm'>
      <Modal.Head>{header}</Modal.Head>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <div className='flex items-center justify-center gap-4'>
          <Button size='sm' onClick={handleConfirm}>
            Yes
          </Button>
          <Button size='sm' onClick={handleCancel}>
            No
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
