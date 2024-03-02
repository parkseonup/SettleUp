import { PersonalAmountData } from '../../pages/Result';
import { colors } from '../../styles/variables/colors';
import { separateComma } from '../../utils/separateComma';

interface Props {
  data: PersonalAmountData;
}

export default function PersonalAmountList({ data }: Props) {
  return (
    <ul
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingTop: '16px',
        marginTop: '16px',
        borderTop: `1px solid ${colors.LIGHT_GRAY}`,
      }}
    >
      {Object.entries(data).map(([person, amount]) => (
        <li
          key={person}
          css={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <p>{person}</p>
          <p>{separateComma(amount)} 원</p>
        </li>
      ))}
    </ul>
  );
}
