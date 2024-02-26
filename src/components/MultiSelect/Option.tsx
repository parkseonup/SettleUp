import { colors } from '../../styles/variables/colors';
import { ButtonHTMLAttributes } from 'react';
import { buttonColors } from '../../styles/common/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export default function Option({ isActive, children, ...props }: Props) {
  return (
    <button
      type="button"
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        padding: '0 16px',
        fontSize: '14px',
        textAlign: 'center',
        border: `1px solid ${isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY}`,
        borderRadius: '100px',
        cursor: 'pointer',
        ...(isActive ? buttonColors.fill : buttonColors.default),

        '&:focus': {
          borderColor: colors.DARK_GRAY,
        },
      }}
      {...props}
    >
      {children}
    </button>
  );
}
