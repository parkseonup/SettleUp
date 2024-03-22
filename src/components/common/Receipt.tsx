import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { colors } from '../../styles/variables/colors';

interface Props {
  children: ReactNode;
}

export default forwardRef(function Receipt(
  { children }: Props,
  ref?: ForwardedRef<HTMLElement>,
) {
  const DECORATION_RADIUS = 4;

  return (
    <section
      ref={ref}
      css={{
        position: 'relative',
        display: ' flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '40px 18px 56px',
        fontSize: '14px',
        color: colors.BLACK,
        backgroundColor: colors.WHITE,

        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          display: 'block',
          height: `${DECORATION_RADIUS * 2}px`,
          backgroundSize: `${DECORATION_RADIUS * 4}px ${DECORATION_RADIUS * 2}px`,
          backgroundPosition: 'top center',
        },
        '&::before': {
          top: 0,
          backgroundImage: `radial-gradient(circle at 50% -2px, ${colors.POINT} calc(${DECORATION_RADIUS}px + 1px), transparent calc(${DECORATION_RADIUS}px + 2px))`,
        },
        '&::after': {
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 50% 10px, ${colors.POINT} calc(${DECORATION_RADIUS}px + 1px), transparent calc(${DECORATION_RADIUS}px + 2px))`,
        },
      }}
    >
      {children}
    </section>
  );
});
