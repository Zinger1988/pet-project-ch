import React from 'react';
import Modal from './Modal';
import { Button } from '../../components';
import { useModal } from '../../context/ModalContext';

interface RoomInviteModalProps {
  className?: string;
}

const RoomInviteModal: React.FC<RoomInviteModalProps> = ({ className = '' }) => {
  const modal = useModal();

  return (
    <Modal id='inviteMembers' className={className}>
      <Modal.Head>Invite new members</Modal.Head>
      <Modal.Body>Text</Modal.Body>
      <Modal.Footer>
        <div className='flex items-center justify-center gap-4'>
          <Button size='sm'>Invite</Button>
          <Button size='sm' appearance='outline'>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomInviteModal;
