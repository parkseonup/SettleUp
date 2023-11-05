import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';

export interface PageTitleDescriptionProps {
  value: string;
  style?: Style;
}

export default function PageTitleDescription({ value, style }: PageTitleDescriptionProps) {
  return (
    <p
      css={css(
        {
          marginTop: '8px',
          fontSize: '14px',
          fontWeight: 400,
          color: colors.DARK_GRAY,
        },
        style,
      )}
    >
      {value}
    </p>
  );
}
