import { ReactNode } from 'react';
import { Style } from '../../../types/Style';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';

interface Props {
  children: ReactNode;
  customStyle?: Style;
}

export default function Controls({ children, customStyle }: Props) {
  return (
    <div
      css={css(
        {
          position: 'absolute',
          top: '50%',
          right: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '4px',
          height: '100%',
          padding: '0 12px',
          backgroundColor: colors.WHITE,
          borderRadius: '0 20px 20px 0',
          transform: 'translateY(-50%)',
        },
        customStyle,
      )}
    >
      {children}
    </div>
  );
}
