import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';

export interface PageTitleProps {
  value: string;
  customStyle?: Style;
}

export default function PageTitle({ value, customStyle }: PageTitleProps) {
  return (
    <h2
      css={css(
        {
          margin: 0,
          fontSize: '20px',
          fontWeight: 500,
          color: colors.BLACK,
        },
        customStyle,
      )}
    >
      {value}
    </h2>
  );
}
