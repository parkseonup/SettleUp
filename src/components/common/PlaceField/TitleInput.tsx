import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { colors } from '../../../styles/variables/colors';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default forwardRef(function TitleInput(
  props: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      type="text"
      css={{
        width: '100%',
        color: colors.POINT,
      }}
      {...props}
    />
  );
});
