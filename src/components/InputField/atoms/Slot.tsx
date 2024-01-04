import { HTMLAttributes, ReactNode } from 'react';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  isActive?: boolean;
  disabled?: boolean;
  children: ReactNode | ((isActive: Props['isActive']) => ReactNode);
}

export default function Slot({ isActive, disabled, children, ...props }: Props) {
  const element = typeof children === 'function' ? children(isActive) : children;

  return (
    <div
      css={{
        position: 'absolute',
        top: '50%',
        right: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '4px',
        height: '100%',
        transform: 'translateY(-50%)',
        pointerEvents: disabled ? 'none' : 'all',
      }}
      {...props}
    >
      {element}
    </div>
  );
}
