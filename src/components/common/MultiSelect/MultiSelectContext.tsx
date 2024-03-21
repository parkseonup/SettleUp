import { createContext, useContext } from 'react';

interface ContextValue {
  required: boolean;
}

export const MultiSelectContext = createContext<ContextValue>({
  required: false,
});

// NOTE: context value 제공
export function useMultiSelectContext() {
  return useContext(MultiSelectContext);
}
