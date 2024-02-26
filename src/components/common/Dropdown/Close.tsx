import { HTMLAttributes } from 'react';
import { useDropdownContext } from './Context';

interface Props {
  children: HTMLAttributes<HTMLDivElement>['children'];
}

export default function Close({ children }: Props) {
  const { setIsActive } = useDropdownContext();

  return <div onClick={() => setIsActive(false)}>{children}</div>;
}
