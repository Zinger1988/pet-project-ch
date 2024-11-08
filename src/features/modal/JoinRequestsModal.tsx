import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Modal from './Modal';
import { NotificationMessage } from '../../components';

import { RootState } from '../../store';
import { assertRoom } from '../../types/assertions';
import { useModal } from '../../context/ModalContext';

interface JoinRequestsModalProps {
  className?: string;
}

const JoinRequestsModal: React.FC<JoinRequestsModalProps> = ({ className = '' }) => {
  const { room } = useSelector((state: RootState) => state.singleRoomSlice);
  const { closeModal } = useModal();

  assertRoom(room);

  const { joinRequests } = room;

  useEffect(() => {
    if (room.joinRequests.length === 0) {
      closeModal();
    }
  }, [room, closeModal]);

  return (
    <Modal id='joinRequests' className={className}>
      <Modal.Head>Join requests</Modal.Head>
      <Modal.Body>
        {joinRequests.map((n) => (
          <NotificationMessage key={n.id} notification={n} />
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default JoinRequestsModal;
