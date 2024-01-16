import { SetStateAction } from 'jotai';
import { Dispatch, createContext, useContext } from 'react';

export interface DropdownContextValue {
  isActive: boolean;
  setIsActive?: Dispatch<SetStateAction<DropdownContextValue['isActive']>>;
}

export interface UseDropdownContextValue extends DropdownContextValue {
  setIsActive: Dispatch<SetStateAction<DropdownContextValue['isActive']>>;
}

export const DropdownContext = createContext<DropdownContextValue>({ isActive: false });

export function useDropdownContext(): UseDropdownContextValue {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      'Dropdown 컴파운드 컴포넌트는 Dropdown 컴포넌트 외부에서 사용하실 수 없습니다.',
    );
  }

  if (!context.setIsActive) {
    throw new Error('Context 내부에 setIsActive가 정의되지 않았습니다.');
  }

  return {
    isActive: context.isActive,
    setIsActive: context.setIsActive,
  };
}
