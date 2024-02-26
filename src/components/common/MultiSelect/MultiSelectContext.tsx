import { ReactNode, createContext, useContext } from 'react';

interface Props {
  value: ContextValue;
  children: ReactNode;
}

interface ContextValue {
  required: boolean;
}

const MultiSelectContext = createContext<ContextValue>({
  required: false,
});

export function MultiSelectContextProvider({ value, children }: Props) {
  return (
    <MultiSelectContext.Provider value={value}>{children}</MultiSelectContext.Provider>
  );
}

export function useMultiSelectContext() {
  return useContext(MultiSelectContext);
}
