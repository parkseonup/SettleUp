import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { colors } from '../../../styles/variables/colors';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default forwardRef(function Input({ ...props }: Props, ref?: ForwardedRef<HTMLInputElement>) {
  return (
    <input
      ref={ref}
      type="text"
      css={{
        width: '100%',
        height: '100%',
        padding: '0 16px',
        color: colors.DARK_GRAY,
        backgroundColor: 'transparent',
        border: `1px solid ${colors.LIGHT_GRAY}`,
        borderRadius: '20px',

        '&::placeholder': {
          color: colors.LIGHT_GRAY,
        },

        '&:focus, &:active': {
          borderColor: colors.DARK_GRAY,
        },
      }}
      {...props}
    />
  );
});
