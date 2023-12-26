import { css } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { colors } from '../../../styles/variables/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'prev' | 'next';
  label?: string;
}

export default function ButtonToMoveMonth({ label, direction, ...props }: Props) {
  const ChevonIcon = direction === 'prev' ? BiChevronLeft : BiChevronRight;

  return (
    <button type="button" {...props} aria-label={label}>
      <ChevonIcon
        css={css({
          fontSize: '18px',
          color: colors.LIGHT_GRAY,
          pointerEvents: 'none',
        })}
      />
    </button>
  );
}
