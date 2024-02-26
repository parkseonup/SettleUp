import { HTMLAttributes, ReactNode } from 'react';
import { useInputFieldContext } from './InputFieldContext';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  disabled?: boolean;
  children: ReactNode | ((isActive: boolean) => ReactNode);
}

export default function Slot({ disabled, children, ...props }: Props) {
  const { isActive } = useInputFieldContext();
  const element = typeof children === 'function' ? children(isActive) : children;

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '4px',
        width: '48px',
        height: '100%',
        pointerEvents: disabled ? 'none' : 'all',
      }}
      {...props}
    >
      {element}
    </div>
  );
}
