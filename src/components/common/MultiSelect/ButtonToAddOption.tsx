import { BiPlus } from 'react-icons/bi';
import { ButtonHTMLAttributes } from 'react';
import { colors } from '../../../styles/variables/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

// NOTE: addInput 하위 컴포넌트로, 추가 button ui
export default function ButtonToAddOption({ isActive, ...props }: Props) {
  return (
    <button
      type="button"
      css={{
        display: 'block',
        height: '100%',
        fontSize: '14px',
        color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
      }}
      aria-label="추가"
      {...props}
    >
      <BiPlus />
    </button>
  );
}
