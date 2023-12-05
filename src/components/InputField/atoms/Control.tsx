import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export default function Control({ children, disabled }: Props) {
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
    >
      {children}
    </div>
  );
}
