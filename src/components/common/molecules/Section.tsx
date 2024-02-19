import { ReactNode } from 'react';
import Title from '../atoms/Title';

interface Props {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <section>
      <Title as="h3" font="size100" css={{ marginBottom: '16px' }}>
        {title}
      </Title>

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {children}
      </div>
    </section>
  );
}
