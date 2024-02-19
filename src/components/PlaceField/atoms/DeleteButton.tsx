import { BiX } from 'react-icons/bi';
import { colors } from '../../../styles/variables/colors';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export default function DeleteButton({ isActive, ...props }: Props) {
  return (
    <button
      type="button"
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '20px',
      }}
      {...props}
    >
      <BiX
        css={{
          fontSize: '20px',
          color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
          pointEvents: 'none',
        }}
      />
    </button>
  );
}
