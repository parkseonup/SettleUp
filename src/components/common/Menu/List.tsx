import { HTMLAttributes } from 'react';

interface MenuListProps extends HTMLAttributes<HTMLUListElement> {}

export default function List({ children, ...props }: MenuListProps) {
  return (
    <ul css={{ display: 'flex', flexDirection: 'column', gap: '16px' }} {...props}>
      {children}
    </ul>
  );
}
