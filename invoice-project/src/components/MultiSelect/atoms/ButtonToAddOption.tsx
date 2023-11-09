import { css } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';
import { colors } from '../../../styles/variables/colors';
import { ButtonHTMLAttributes } from 'react';

interface Props {
  isActive: boolean;
  onClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

export default function ButtonToAddOption({ isActive, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css({
        position: 'absolute',
        top: '50%',
        right: '0',
        display: 'block',
        height: '100%',
        paddingRight: '10px',
        fontSize: '14px',
        color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
        transform: 'translateY(-50%)',
      })}
      aria-label="추가"
    >
      <BiPlus />
    </button>
  );
}
