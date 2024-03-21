import { separateComma } from '../../utils/separateComma';
import Section from '../common/Section';
import SublistItem from '../common/SublistItem';
import { useResultContext } from './ResultContext';

// NOTE: 결제 내역 ui
// TODO: 장소명 + **원 구조 동일하니까 컴포넌트 분리
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
              <li
                key={id}
                css={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <p>
                  {name} ({participants.length}명)
                </p>
                <p>{separateComma(amount)} 원</p>
              </li>
            );
          } else {
            return (
              <div key={id}>
                <div
                  css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <p>{name}</p>
                  <p>{separateComma(amount)} 원</p>
                </div>
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
