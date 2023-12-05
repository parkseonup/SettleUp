import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { colors } from '../../../styles/variables/colors';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isActive?: boolean;
}

export default forwardRef(function Input({ isActive, ...props }: Props, ref?: ForwardedRef<HTMLInputElement>) {
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
        border: `1px solid ${isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY}`,
        borderRadius: '20px',

        '&::placeholder': {
          color: colors.LIGHT_GRAY,
        },
      }}
      {...props}
    />
  );
});
