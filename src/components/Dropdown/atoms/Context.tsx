import { createContext, useContext } from 'react';

export interface DropdownContextValue {
  isActive: boolean;
  setIsActive?: (isActive: DropdownContextValue['isActive']) => void;
}

export const DropdownContext = createContext<DropdownContextValue>({ isActive: false });

export function useDropdownContext() {
  const contextValue = useContext(DropdownContext);

  (Object.keys(contextValue) as (keyof typeof contextValue)[]).forEach((key) => {
    if (contextValue[key] === undefined) {
      throw new Error('Context 내부에 setIsActive가 정의되지 않았습니다.');
    }
  });

  return contextValue;
}
