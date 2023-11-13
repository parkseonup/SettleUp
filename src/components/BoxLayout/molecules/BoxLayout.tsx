import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import Content from '../atoms/Content';
import Title from '../../common/atoms/Title';
import { ReactNode } from 'react';
import Footer from '../atoms/Footer';
import getChildComponent from '../../../utils/getChildComponent';
import { Style } from '../../../types/Style';

interface Props {
  children: ReactNode;
  customStyle?: Style;
}

function Layout({ children, customStyle }: Props) {
  const title = getChildComponent(children, Title);
  const content = getChildComponent(children, Content);
  const footer = getChildComponent(children, Footer);

  return (
    <div
      css={css(
        {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '16px',
          fontSize: '14px',
          border: `1px solid ${colors.LIGHT_GRAY}`,
          borderRadius: '20px',
        },
        customStyle,
      )}
    >
      {title || null}
      {content || null}
      {footer || null}
    </div>
  );
}

const BoxLayout = Object.assign(Layout, {
  Title: Title,
  Content: Content,
  Footer: Footer,
});

export default BoxLayout;
