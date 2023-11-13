import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';
import { ReactNode } from 'react';

interface ContentTitleOptionProps {
  children: ReactNode;
  customStyle?: Style;
}

export default function ContentTitleOption({ children, customStyle }: ContentTitleOptionProps) {
  return (
    <em
      css={css(
        {
          display: 'inline-block',
          marginLeft: '0.4em',
          fontWeight: 400,
          fontStyle: 'normal',
          color: colors.DARK_GRAY,
        },
        customStyle,
      )}
    >
      {children}
    </em>
  );
}
