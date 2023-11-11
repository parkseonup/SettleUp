import { css } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';
import getFilteredProps from '../../../utils/getFilteredProps';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { colors } from '../../../styles/variables/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'prev' | 'next';
  label?: string;
}

export default function ButtonToMoveMonth(props: Props) {
  const filteredProps = getFilteredProps(props, ['label', 'direction']);
  const ChevonIcon = props.direction === 'prev' ? BiChevronLeft : BiChevronRight;

  return (
    <button {...filteredProps} aria-label={props.label}>
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
