import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Content({ children }: Props) {
  return (
    <div
      css={{
        padding: '40px 0',
      }}
    >
      {children}
    </div>
  );
}
