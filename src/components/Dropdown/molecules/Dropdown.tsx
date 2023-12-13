import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import Portal from '../atoms/Portal';
import Trigger from '../atoms/Trigger';
import { DropdownContext } from '../atoms/Context';
import Close from '../atoms/Close';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Dropdown({ children, ...props }: Props) {
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: Event) => {
    e.stopPropagation();

    if (!modalRef.current) return;
    if (modalRef.current.contains(e.target as HTMLElement)) return;
    if (setIsActive === undefined || !isActive) return;
    console.log('[handleClickOutside]');

    setIsActive(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <DropdownContext.Provider value={{ isActive, setIsActive }}>
      <div
        ref={modalRef}
        css={{
          position: 'relative',
        }}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Trigger = Trigger;
Dropdown.Portal = Portal;
Dropdown.Close = Close;
