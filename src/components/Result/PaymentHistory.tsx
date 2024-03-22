import { separateComma } from '../../utils/separateComma';
import LabeledAmount from '../common/LabeledAmount';
import Section from '../common/Section';
import SublistItem from '../common/SublistItem';
import { useResultContext } from './ResultContext';

export default function PaymentHistory() {
  const { place } = useResultContext();

  return (
    <Section title="결제 내역" type="underline">
      <ul
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '0 8px',
        }}
      >
        {place.map(({ id, name, amount, participants, sub }) => {
          if (sub.length === 0) {
            return (
              <li key={id}>
                <LabeledAmount
                  label={`${name} ${participants.length}명`}
                  amount={amount}
                />
              </li>
            );
          } else {
            return (
              <div key={id}>
                <LabeledAmount label={name} amount={amount} />
                <ul
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    paddingTop: '8px',
                  }}
                >
                  {sub.map((subItem) => (
                    <li key={subItem.id}>
                      <SublistItem
                        title={`${subItem.name} (${subItem.participants.length}명)`}
                      >
                        <p>{separateComma(subItem.amount)} 원</p>
                      </SublistItem>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        })}
      </ul>
    </Section>
  );
}
