import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '../../components';

import { useModal } from '../../context/ModalContext';
import { IconId } from '../../types/enums';

interface ModalProps {
  children: ReactNode;
  id: string;
  className?: string;
}

interface ModalWithChildren {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> & {
  Head: React.FC<ModalWithChildren>;
  Body: React.FC<ModalWithChildren>;
  Footer: React.FC<ModalWithChildren>;
} = ({ id, children, className = '' }) => {
  const { openedId, closeModal, callbacks } = useModal();

  if (openedId !== id) return null;

  const onClose = callbacks?.onClose;
  const onOpen = callbacks?.onOpen;
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
      onClose && onClose();
    }
  };
  const overlayStyles = 'fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black/80';
  const containerStyles = `w-[90%] min-w-[300px] max-w-[500px] rounded-xl bg-gray-700 ${className}`;

  onOpen && onOpen();

  return createPortal(
    <div onClick={handleClose} className={overlayStyles}>
      <div className={containerStyles}>{children}</div>
    </div>,
    document.body,
  );
};

const Head: React.FC<ModalWithChildren> = ({ children }) => {
  const { closeModal } = useModal();
  const containerStyles = 'flex items-center gap-4 border-b border-gray-600 px-4 py-3';
  const titleStyles = 'text-h4 m-0 flex-grow';
  const closeBtnStyles = 'flex-shrink-0';
  const closeBtnIconStyles = 'h-8 w-8 fill-white';

  return (
    <div className={containerStyles}>
      <div className={titleStyles}>{children}</div>
      <button onClick={closeModal} className={closeBtnStyles}>
        <Icon id={IconId.Cancel} className={closeBtnIconStyles} />
      </button>
    </div>
  );
};

const Body: React.FC<ModalWithChildren> = ({ children }) => {
  const containerStyles = 'text-body p-4 pb-6 font-thin';
  return <div className={containerStyles}>{children}</div>;
};

const Footer: React.FC<ModalWithChildren> = ({ children }) => {
  const containerStyles = 'rounded-b-xl bg-gray-800/50 px-4 pb-6 pt-5';
  return <div className={containerStyles}>{children}</div>;
};

Modal.Head = Head;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
