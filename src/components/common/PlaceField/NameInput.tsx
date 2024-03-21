import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { colors } from '../../../styles/variables/colors';
import { visibilityHidden } from '../../../styles/common/displays';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

// NOTE: 장소 이름 입력 input
export default forwardRef(function NameInput(
  props: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div
      css={{
        position: 'relative',
      }}
    >
      <label htmlFor={props.id} css={visibilityHidden}>
        장소이름
      </label>
      <input
        ref={ref}
        type="text"
        css={{
          width: '100%',
          color: colors.POINT,
        }}
        name={props.id}
        {...props}
      />
    </div>
  );
});
