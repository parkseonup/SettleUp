import { HTMLAttributes } from 'react';
import { useDropdownContext } from './Context';

interface Props {
  children: HTMLAttributes<HTMLDivElement>['children'];
}

/** dropdown 닫기 버튼 ui */
export default function Close({ children }: Props) {
  const { setIsActive } = useDropdownContext();

  return <div onClick={() => setIsActive(false)}>{children}</div>;
}
