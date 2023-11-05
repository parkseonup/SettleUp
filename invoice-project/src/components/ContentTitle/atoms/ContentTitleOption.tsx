import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';

interface ContentTitleOptionProps {
  value?: string;
  style?: Style;
}

export default function ContentTitleOption({ value, style }: ContentTitleOptionProps) {
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
        style,
      )}
    >
      {value}
    </em>
  );
}
