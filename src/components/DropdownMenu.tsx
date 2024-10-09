import { createContext, LegacyRef, MouseEvent, ReactNode, useCallback, useContext, useState } from 'react';
import useClickOutsideElement from '../hooks/useClickOutsideElement';

const DropdownContext = createContext({
  isOpen: false,
  handleMenuOpen: (isOpen: boolean) => {},
});

interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

interface OptionProps {
  onClick?: (e: MouseEvent, isOpen: boolean) => void;
  children: ReactNode;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> & {
  Button: React.FC<DropdownMenuProps>;
  List: React.FC<DropdownMenuProps>;
  Option: React.FC<OptionProps>;
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuOpen = useCallback((value: boolean) => setIsOpen(value), []);

  return <DropdownContext.Provider value={{ isOpen, handleMenuOpen }}>{children}</DropdownContext.Provider>;
};

const Button: React.FC<DropdownMenuProps> = ({ children, className = '' }) => {
  const { isOpen, handleMenuOpen } = useContext(DropdownContext);

  return (
    <div
      className={className}
      role='button'
      onClick={(e) => {
        e.stopPropagation();
        handleMenuOpen(!isOpen);
      }}
    >
      {children}
    </div>
  );
};

const List: React.FC<DropdownMenuProps> = ({ children, className = '' }) => {
  const { isOpen, handleMenuOpen } = useContext(DropdownContext);
  const ref = useClickOutsideElement({
    callback: () => {
      handleMenuOpen(false);
    },
  });

  return isOpen ? (
    <ul className={`m-0 p-0 ${className}`} ref={ref as LegacyRef<HTMLUListElement>}>
      {children}
    </ul>
  ) : null;
};

const Option: React.FC<OptionProps> = ({ children, onClick, className = '' }) => {
  const { isOpen, handleMenuOpen } = useContext(DropdownContext);

  const handleClick = (e: MouseEvent) => {
    onClick?.(e, isOpen);
    handleMenuOpen(false);
  };

  return (
    <li onClick={handleClick} className={`m-0 p-0 before:hidden ${className}`}>
      {children}
    </li>
  );
};

DropdownMenu.Button = Button;
DropdownMenu.List = List;
DropdownMenu.Option = Option;

export default DropdownMenu;
