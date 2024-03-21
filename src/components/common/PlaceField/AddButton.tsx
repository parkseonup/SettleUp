import { ButtonHTMLAttributes } from 'react';
import { BiPlus } from 'react-icons/bi';
import { colors } from '../../../styles/variables/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

// NOTE: addButton ui
export default function AddButton({ isActive, ...props }: Props) {
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
      <BiPlus
        css={{
          fontSize: '16px',
          color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
          pointEvents: 'none',
        }}
      />
    </button>
  );
}
