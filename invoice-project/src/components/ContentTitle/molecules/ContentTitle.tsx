import { ElementType, ReactNode } from 'react';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import ContentTitleOption from '../atoms/ContentTitleOption';

interface ContentTitleProps {
  as: ElementType;
  option?: string;
  children?: ReactNode;
}

export default function ContentTitle({ as: Title, option, children }: ContentTitleProps) {
  return (
    <Title
      css={css({
        padding: 0,
        margin: 0,
        fontSize: '15px',
        fontWeight: 500,
        color: colors.BLACK,
      })}
    >
      {children}
      {option ? <ContentTitleOption value={option} /> : null}
    </Title>
  );
}
