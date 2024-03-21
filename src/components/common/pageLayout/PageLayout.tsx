import { css } from '@emotion/react';
import { screenSize } from '../../../styles/common/screenSize';
import GlobalHeader from '../GlobalHeader/GlobalHeader';
import PageHeader, { Props as TitleProps } from './PageHeader';
import { ReactNode } from 'react';
import { theme } from '../../../styles/common/theme';

interface Props extends TitleProps {
  mode?: 'point' | 'default';
  children: ReactNode;
}

// NOTE: PageLayout ui
export default function PageLayout({
  title,
  description,
  mode = 'default',
  children,
}: Props) {
  return (
    <div css={css(theme[mode], screenSize)}>
      <GlobalHeader />

      <div
        css={{
          padding: '20px 0',
        }}
      >
        <PageHeader title={title} description={description} />
        <main>{children}</main>
      </div>
    </div>
  );
}
