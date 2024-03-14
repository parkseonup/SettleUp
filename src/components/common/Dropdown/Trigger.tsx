import { MouseEvent, KeyboardEvent, ReactNode } from 'react';
import { UseDropdownContextValue, useDropdownContext } from './Context';

interface Props {
  children:
    | ReactNode
    | (({ isActive, setIsActive }: UseDropdownContextValue) => ReactNode);
}

export default function Trigger({ children, ...props }: Props) {
  const { isActive, setIsActive } = useDropdownContext();

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (e.target) setIsActive(!isActive);
  };

  const onKeydownEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.code !== 'Enter') return;

    setIsActive(!isActive);
  };

  return (
    <div onMouseDown={onMouseDown} onKeyDown={onKeydownEnter} {...props}>
      {typeof children === 'function' ? children({ isActive, setIsActive }) : children}
    </div>
  );
}
