import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';

export interface PageTitleDescriptionProps {
  value: string;
  customStyle?: Style;
}

export default function PageTitleDescription({ value, customStyle }: PageTitleDescriptionProps) {
  return (
    <p
      css={css(
        {
          marginTop: '8px',
          fontSize: '14px',
          fontWeight: 400,
          color: colors.DARK_GRAY,
        },
        customStyle,
      )}
    >
      {value}
    </p>
  );
}
