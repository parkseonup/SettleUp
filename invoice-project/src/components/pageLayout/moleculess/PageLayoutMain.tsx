import { ReactNode } from 'react';
import { css } from '@emotion/react';
import getCompositionComponent from '../../../utils/getCompositionComponent';
import PageTitleDescription from '../atoms/PageTitleDescription';
import PageTitle from '../atoms/PageTitle';
import PageContent from '../atoms/PageContent';
import { contentPadding } from '../../../styles/common/layout/contentPadding';

interface PageLayoutMainProps {
  children: ReactNode;
}

export default function PageLayoutMain({ children }: PageLayoutMainProps) {
  const title = getCompositionComponent(children, PageTitle);
  const description = getCompositionComponent(children, PageTitleDescription);
  const content = getCompositionComponent(children, PageContent);

  return (
    <section
      css={css(contentPadding, {
        marginTop: '20px',
      })}
    >
      <header
        css={css({
          marginBottom: '40px',
        })}
      >
        {title}
        {description || null}
      </header>

      {content}
    </section>
  );
}
