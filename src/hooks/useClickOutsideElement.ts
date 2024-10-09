import { useEffect, useRef } from 'react';

type useClickOutsideElementProps = ({ callback }: { callback: () => void }) => unknown;

const useClickOutsideElement: useClickOutsideElementProps = ({ callback }) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [callback]);

  return ref;
};

export default useClickOutsideElement;
