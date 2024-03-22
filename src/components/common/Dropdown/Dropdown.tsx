import { FocusEvent, HTMLAttributes, useRef, useState } from 'react';
import Portal from './Portal';
import Trigger from './Trigger';
import { DropdownContext } from './Context';
import Close from './Close';
import useOutsideClick from '../../../hooks/useOutsideClick';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Dropdown({ children, ...props }: Props) {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    setIsActive(false);
  });

  const onFocus = () => {
    setIsActive(true);
  };

  const onBlur = (e: FocusEvent) => {
    if (e.relatedTarget !== null && !containerRef.current?.contains(e.relatedTarget))
      setIsActive(false);
  };

  return (
    <DropdownContext.Provider value={{ isActive, setIsActive }}>
      <div
        ref={containerRef}
        css={{
          position: 'relative',
        }}
        onFocus={onFocus}
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
