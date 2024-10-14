import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type ModalCallbacksVariants = 'onClose' | 'onOpen' | 'onConfirm' | 'onCancel';
type PartialModalCallbacks = Partial<Record<ModalCallbacksVariants, () => void>>;
type OpenModal = {
  id: string;
  headerContent?: string;
  bodyContent?: ReactNode;
  footerContent?: ReactNode;
  callbacks?: PartialModalCallbacks;
};

interface initialStateProps {
  openedId: string;
  openModal: ({ id, callbacks }: OpenModal) => void;
  closeModal: () => void;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  callbacks?: PartialModalCallbacks;
}

const initialState: initialStateProps = {
  openedId: '',
  openModal: ({ id, callbacks }: OpenModal) => {},
  closeModal: () => {},
};

const ModalContext = createContext(initialState);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [openedId, setOpenedId] = useState<string>('');
  const [callbacks, setCallbacks] = useState<PartialModalCallbacks>();
  const [header, setHeader] = useState<ReactNode>();
  const [body, setBody] = useState<ReactNode>();
  const [footer, setFooter] = useState<ReactNode>();

  const openModal = useCallback(({ id, callbacks, headerContent, bodyContent, footerContent }: OpenModal) => {
    setOpenedId(id);
    callbacks && setCallbacks(callbacks);
    headerContent && setHeader(headerContent);
    bodyContent && setBody(bodyContent);
    footerContent && setFooter(footerContent);
  }, []);
  const closeModal = useCallback(() => setOpenedId(''), []);

  return (
    <ModalContext.Provider value={{ openedId, callbacks, header, body, footer, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('Looks like you use modal context outside provider');
  }

  return context;
};
