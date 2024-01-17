import { FocusEvent, HTMLAttributes, useRef, useState } from 'react';
import Portal from '../atoms/Portal';
import Trigger from '../atoms/Trigger';
import { DropdownContext } from '../atoms/Context';
import Close from '../atoms/Close';
import useOutsideClick from '../../../hooks/useOutsideClick';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Dropdown({ children, ...props }: Props) {
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => {
    setIsActive(false);
  });

  const onBlur = (e: FocusEvent) => {
    if (e.relatedTarget !== null && !modalRef.current?.contains(e.relatedTarget))
      setIsActive(false);
  };

  return (
    <DropdownContext.Provider value={{ isActive, setIsActive }}>
      <div
        ref={modalRef}
        css={{
          position: 'relative',
        }}
        onBlur={onBlur}
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
