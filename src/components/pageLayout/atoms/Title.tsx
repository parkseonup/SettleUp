import { css } from '@emotion/react';
import { Style } from '../../../types/Style';
import { colors } from '../../../styles/variables/colors';

export interface TitleProps {
  children: string;
  customStyle?: Style;
}

export default function Title({ children, customStyle }: TitleProps) {
  return (
    <h2
      css={css(
        {
          fontSize: '20px',
          fontWeight: 600,
          color: colors.BLACK,
        },
        customStyle,
      )}
    >
      {children}
    </h2>
  );
}
