import { createContext, useContext } from 'react';

export interface DropdownContextValue {
  isActive: boolean;
  setIsActive?: (isActive: DropdownContextValue['isActive']) => void;
}

export const DropdownContext = createContext<DropdownContextValue>({ isActive: false });

export function useDropdownContext() {
  const { isActive, setIsActive } = useContext(DropdownContext);

  if (setIsActive === undefined) {
    throw new Error('Context 내부에 setIsActive가 정의되지 않았습니다.');
  }

  return { isActive, setIsActive };
}
