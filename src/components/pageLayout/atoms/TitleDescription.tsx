import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';

export interface TitleDescriptionProps {
  value: string;
  customStyle?: Style;
}

export default function TitleDescription({ value, customStyle }: TitleDescriptionProps) {
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
