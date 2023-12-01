import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { Style } from '../../../types/Style';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';

interface Props {
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  readOnly?: InputHTMLAttributes<HTMLInputElement>['readOnly'];
  placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  isActive?: boolean;
  customStyle?: Style;
  onFocus?: InputHTMLAttributes<HTMLInputElement>['onFocus'];
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
}

export default forwardRef(function Input(
  { type, readOnly, placeholder, isActive, customStyle, onFocus, onBlur }: Props,
  ref?: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      type={type ?? 'text'}
      placeholder={placeholder}
      readOnly={readOnly}
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
});
