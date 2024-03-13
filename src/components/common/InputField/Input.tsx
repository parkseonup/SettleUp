import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { colors } from '../../../styles/variables/colors';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isActive?: boolean;
}

export default forwardRef(function Input(
  { ...props }: Props,
  ref?: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      type="text"
      css={{
        width: '100%',
        height: '100%',
        color: colors.DARK_GRAY,
        backgroundColor: 'transparent',

        '&::placeholder': {
          color: colors.LIGHT_GRAY,
        },
      }}
      {...props}
    />
  );
});
