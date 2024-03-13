import { createContext, useContext } from 'react';

interface ContextValue {
  isActive: boolean;
}

export const InputFieldContext = createContext<ContextValue>({
  isActive: false,
});

export const useInputFieldContext = () => useContext(InputFieldContext);
