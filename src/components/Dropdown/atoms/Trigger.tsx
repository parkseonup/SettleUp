import { ReactNode } from 'react';
import { DropdownContextValue, useDropdownContext } from './Context';

interface ChildrenArgs extends DropdownContextValue {
  setIsActive: (isActive: DropdownContextValue['isActive']) => void;
}

interface Props {
  children: ({ isActive, setIsActive }: ChildrenArgs) => ReactNode;
}

export default function Trigger({ children, ...props }: Props) {
  const { isActive, setIsActive } = useDropdownContext();

  return <div {...props}>{children({ isActive, setIsActive })}</div>;
}
