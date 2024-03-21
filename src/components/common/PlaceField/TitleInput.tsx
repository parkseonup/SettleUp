import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { colors } from '../../../styles/variables/colors';
import { visibilityHidden } from '../../../styles/common/displays';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

// NOTE: 장소 이름 입력 input
// TODO: title 말고 placeName 으로 변경하기 (데이터도)
export default forwardRef(function TitleInput(
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
