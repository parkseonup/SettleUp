import { InputHTMLAttributes } from 'react';
import { Style } from '../../../types/Style';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';

interface Props {
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  isActive?: boolean;
  customStyle?: Style;
  onFocus?: (arg?: any) => void;
  onBlur?: (arg?: any) => void;
}

export default function Input({ type, placeholder, isActive, customStyle, onFocus, onBlur }: Props) {
  return (
    <input
      type={type ?? 'text'}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      css={css(
        {
          width: '100%',
          height: '100%',
          padding: 0,
          color: colors.DARK_GRAY,
          backgroundColor: isActive ? colors.BG_GRAY : 'transparent',

          '&::placeholder': {
            color: colors.LIGHT_GRAY,
          },
        },
        customStyle,
      )}
    />
  );
}
