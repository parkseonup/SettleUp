import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import { Style } from '../../../types/Style';

interface Props {
  children: ReactNode;
  customStyle?: Style;
  isActive?: boolean;
}

export default function InputWrapper({ children, customStyle, isActive }: Props) {
  return (
    <div
      css={css(
        {
          position: 'relative',
          height: '40px',
          border: `1px solid ${isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY}`,
          borderRadius: '100px',
        },
        customStyle,
      )}
    >
      {children}
    </div>
  );
}
