import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../components/common/pageLayout/PageLayout';
import { PlaceInfo, Settlement } from '../types/Settlement';
import Title from '../components/common/Title';
import { colors } from '../styles/variables/colors';
import Section from '../components/common/Section';
import ButtonWrapper from '../components/common/ButtonWrapper';
import Button from '../components/common/Button';
import { useMemo, useRef } from 'react';
import { ceilToTen } from '../utils/math';
import PaymentHistory from '../components/Result/PaymentHistory';
import PaymentDetails from '../components/Result/PaymentDefails';
import PersonalAmountList from '../components/Result/PersonalAmountList';
import ShareButton from '../components/Result/ShareButton';

export interface PersonalAmountData {
  [key: PlaceInfo['participants'][number]]: PlaceInfo['amount'];
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const captureElementRef = useRef<HTMLElement>(null);

  const { title, date, place, payment } = location.state as Settlement;
  const { payer, selectedPaymentMethods, bankTransfer } = payment;
  const hasAccount = selectedPaymentMethods.includes('계좌송금');
  const etcPaymentMethods = selectedPaymentMethods.filter(
    (paymentMethod) => paymentMethod !== '계좌송금',
  );

  const personalAmountList = useMemo(
    () =>
      place.reduce<PersonalAmountData>((list, placeItem) => {
        if (placeItem.sub.length > 0) {
          placeItem.sub.forEach((subItem) => {
            const quotient = subItem.amount / subItem.participants.length;

            subItem.participants.forEach((participant) => {
              list[participant] = (list[participant] || 0) + quotient;
            });
          });

          Object.keys(list).forEach((person) => {
            list[person] = ceilToTen(list[person]);
          });

          return list;
        }

        const quotient = placeItem.amount / placeItem.participants.length;

        placeItem.participants.forEach((participant) => {
          list[participant] = (list[participant] || 0) + quotient;
        });

        Object.keys(list).forEach((person) => {
          list[person] = ceilToTen(list[person]);
        });

        return list;
      }, {}),
    [],
  );

  const DECORATION_RADIUS = 4;

  const onClickEdit = () => {
    navigate('/create/1', { state: location.state });
  };

  return (
    <PageLayout title="정산 결과" mode="point">
      <main
        ref={captureElementRef}
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

        <PaymentHistory place={place} />

        <Section title="정산 요청" type="underline">
          <div
            css={{
              padding: '0 8px',
            }}
          >
            <PaymentDetails
              payer={payer}
              hasAccount={hasAccount}
              etcPaymentMethods={etcPaymentMethods}
              bankTransfer={bankTransfer}
            />
            <PersonalAmountList data={personalAmountList} />
          </div>
        </Section>
      </main>

      <ButtonWrapper>
        <ShareButton
          data={{
            title,
            date,
            payment,
            hasAccount,
            etcPaymentMethods,
            personalAmountList,
          }}
          captureElement={captureElementRef.current}
        />
        <Button onClick={onClickEdit}>정산 수정하기</Button>
      </ButtonWrapper>
    </PageLayout>
  );
}
