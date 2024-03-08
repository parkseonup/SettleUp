import { ForwardedRef, forwardRef } from 'react';
import { colors } from '../../styles/variables/colors';
import Title from '../common/Title';
import PaymentHistory from './PaymentHistory';
import Section from '../common/Section';
import PaymentDetails from './PaymentDefails';
import PersonalAmountList from './PersonalAmountList';
import { useResultContext } from './ResultContext';

interface Props {}

export default forwardRef(function ResultMain(
  props: Props,
  ref: ForwardedRef<HTMLElement>,
) {
  const DECORATION_RADIUS = 4;
  const { title, date } = useResultContext();

  return (
    <main
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
      <div>
        <Title as="h3" font="size900">
          {title}
        </Title>
        <p
          css={{
            marginTop: '4px',
            fontSize: '14px',
            fontWeight: 400,
            color: colors.DARK_GRAY,
          }}
        >
          {date}
        </p>
      </div>

      <PaymentHistory />

      <Section title="정산 요청" type="underline">
        <div
          css={{
            padding: '0 8px',
          }}
        >
          <PaymentDetails />
          <PersonalAmountList />

          <small
            css={{
              display: 'block',
              marginTop: '40px',
            }}
          >
            * 1원 단위는 올림 처리되었습니다.
          </small>
        </div>
      </Section>
    </main>
  );
});
