import { ReactNode } from 'react';
import { css } from '@emotion/react';
import getChildComponent from '../../../utils/getChildComponent';
import TitleDescription from '../atoms/TitleDescription';
import Title from '../atoms/Title';
import Content from '../atoms/Content';
import { contentPadding } from '../../../styles/common/layout/contentPadding';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const title = getChildComponent(children, Title);
  const description = getChildComponent(children, TitleDescription);
  const content = getChildComponent(children, Content);

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

const PageLayout = Object.assign(Layout, {
  Title: Title,
  Description: TitleDescription,
  Content: Content,
});

export default PageLayout;
