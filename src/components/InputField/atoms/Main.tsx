import { ReactNode } from 'react';
import { Style } from '../../../types/Style';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';

interface Props {
  children: ReactNode;
  isActive?: boolean;
  customStyle?: Style;
}

export default function Main({ children, isActive, customStyle }: Props) {
  return (
    <div
      css={css(
        {
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(64px, auto))',
          alignItems: 'center',
          gap: '16px',
          height: '40px',
          padding: '8px 16px',
          border: `1px solid ${isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY}`,
          borderRadius: '20px',
        },
        customStyle,
      )}
    >
      {children}
    </div>
  );
}
