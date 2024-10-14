import { useEffect, useRef } from 'react';

type useClickOutsideElementProps = ({
  callback,
  capturingPhase,
}: {
  callback: () => void;
  capturingPhase?: boolean;
}) => unknown;

const useClickOutsideElement: useClickOutsideElementProps = ({ callback, capturingPhase = false }) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', clickHandler, capturingPhase);
    return () => {
      document.removeEventListener('click', clickHandler, capturingPhase);
    };
  }, [callback, capturingPhase]);

  return ref;
};

export default useClickOutsideElement;
