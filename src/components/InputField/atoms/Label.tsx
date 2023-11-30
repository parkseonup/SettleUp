import { ReactNode } from 'react';
import { Style } from '../../../types/Style';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';

interface Props {
  children: ReactNode;
  isActive?: boolean;
  customStyle?: Style;
}

export default function Label({ children, isActive, customStyle }: Props) {
  return (
    <label
      css={css(
        {
          fontSize: '14px',
          color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
        },
        customStyle,
      )}
    >
      {children}
    </label>
  );
}