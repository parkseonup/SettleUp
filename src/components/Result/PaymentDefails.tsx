import { colors } from '../../styles/variables/colors';
import { useResultContext } from './ResultContext';

export default function PaymentDetails() {
  const {
    payment: {
      payer,
      bankTransfer: { bankName, accountNumber },
    },
    hasAccount,
    etcPaymentMethods,
  } = useResultContext();

  return (
    <ul
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',

        '& > li': {
          position: 'relative',
          paddingLeft: '8px',
        },
        '& > li::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          backgroundColor: colors.BLACK,
          transform: 'translateY(-50%)',
        },
      }}
    >
      <li key={payer}>결제자: {payer}</li>
      {hasAccount ? (
        <li key={bankName}>
          계좌번호: {bankName} {accountNumber}
        </li>
      ) : null}
      {etcPaymentMethods.length > 0 ? (
        <li key="payment_etc">{etcPaymentMethods.join(', ')} 가능</li>
      ) : null}
    </ul>
  );
}
