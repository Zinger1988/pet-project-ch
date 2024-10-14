import { createContext, LegacyRef, MouseEvent, ReactNode, useCallback, useContext, useState } from 'react';
import useClickOutsideElement from '../hooks/useClickOutsideElement';
import { createPortal } from 'react-dom';

const MenuContext = createContext({
  isOpen: false,
  position: { x: 0, y: 0 },
  handleMenuOpen: (isOpen: boolean) => {},
  handlePosition: (position: { x: number; y: number }) => {},
});

interface ContextMenuProps {
  children: ReactNode;
  className?: string;
}

interface OptionProps {
  onClick?: (e: MouseEvent, isOpen: boolean) => void;
  children: ReactNode;
  className?: string;
}

const ContextMenu: React.FC<ContextMenuProps> & {
  Button: React.FC<ContextMenuProps>;
  List: React.FC<ContextMenuProps>;
  Option: React.FC<OptionProps>;
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const handleMenuOpen = useCallback((value: boolean) => setIsOpen(value), []);
  const handlePosition = useCallback((position: any) => setPosition(position), []);

  const ref = useClickOutsideElement({
    callback: () => {
      handleMenuOpen(false);
    },
    capturingPhase: false,
  });

  return (
    <MenuContext.Provider value={{ isOpen, position, handlePosition, handleMenuOpen }}>
      <div ref={ref as LegacyRef<HTMLDivElement>}>{children}</div>
    </MenuContext.Provider>
  );
};

const Button: React.FC<ContextMenuProps> = ({ children, className = '' }) => {
  const { isOpen, handleMenuOpen, handlePosition } = useContext(MenuContext);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handlePosition({
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height,
    });
    handleMenuOpen(!isOpen);
  };

  return (
    <div className={className} role='button' onClick={handleClick}>
      {children}
    </div>
  );
};

const List: React.FC<ContextMenuProps> = ({ children, className = '' }) => {
  const { isOpen, position } = useContext(MenuContext);
  const listStyles = `m-0 p-0 fixed -translate-x-1/2 ${className}`;

  if (!isOpen) return null;

  return createPortal(
    <ul className={listStyles} style={{ top: `${position.y}px`, left: `${position.x}px` }}>
      {children}
    </ul>,
    document.body,
  );
};

const Option: React.FC<OptionProps> = ({ children, onClick, className = '' }) => {
  const { isOpen, handleMenuOpen } = useContext(MenuContext);
  const listItemStyles = `m-0 p-0 before:hidden ${className}`;

  const handleClick = (e: MouseEvent) => {
    onClick?.(e, isOpen);
    handleMenuOpen(false);
  };

  return (
    <li onClick={handleClick} className={listItemStyles}>
      {children}
    </li>
  );
};

ContextMenu.Button = Button;
ContextMenu.List = List;
ContextMenu.Option = Option;

export default ContextMenu;
