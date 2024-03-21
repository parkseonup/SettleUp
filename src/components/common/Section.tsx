import { ReactNode } from 'react';
import Title from './Title';
import { colors } from '../../styles/variables/colors';
import { css } from '@emotion/react';

interface Props {
  title: string;
  type?: 'default' | 'underline';
  children: ReactNode;
}

const underlineStyle = {
  paddingBottom: '16px',
  borderBottom: `1px solid ${colors.BLACK}`,
};

export default function Section({ title, type = 'default', children }: Props) {
  return (
    <section>
      <Title
        as="h3"
        font="size100"
        css={css(
          {
            marginBottom: '16px',
          },
          type === 'underline' ? underlineStyle : null,
        )}
      >
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
