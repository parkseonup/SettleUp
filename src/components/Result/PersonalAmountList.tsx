import { colors } from '../../styles/variables/colors';
import { Entries } from '../../types/Entries';
import { separateComma } from '../../utils/separateComma';
import { PersonalAmountData, useResultContext } from './ResultContext';

export default function PersonalAmountList() {
  const { personalAmountList } = useResultContext();

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
      {(Object.entries(personalAmountList) as Entries<PersonalAmountData>).map(
        ([person, amount]) => (
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
        ),
      )}
    </ul>
  );
}
