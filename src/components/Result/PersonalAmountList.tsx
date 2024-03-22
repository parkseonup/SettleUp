import { colors } from '../../styles/variables/colors';
import LabeledAmount from '../common/LabeledAmount';
import { useResultContext } from './ResultContext';

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
      {Object.entries(personalAmountList).map(([person, amount]) => (
        <li key={person}>
          <LabeledAmount label={person} amount={amount} />
        </li>
      ))}
    </ul>
  );
}
