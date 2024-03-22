import { createContext, useContext } from 'react';

interface ContextValue {
  required: boolean;
}

export const MultiSelectContext = createContext<ContextValue>({
  required: false,
});

export function useMultiSelectContext() {
  return useContext(MultiSelectContext);
}
