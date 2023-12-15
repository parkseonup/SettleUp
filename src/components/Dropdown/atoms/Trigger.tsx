import { ReactNode } from 'react';
import { UseDropdownContextValue, useDropdownContext } from './Context';

interface Props {
  children: ReactNode | (({ isActive, setIsActive }: UseDropdownContextValue) => ReactNode);
}

export default function Trigger({ children, ...props }: Props) {
  const { isActive, setIsActive } = useDropdownContext();

  return <div {...props}>{typeof children === 'function' ? children({ isActive, setIsActive }) : children}</div>;
}
