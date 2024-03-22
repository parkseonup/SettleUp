import { separateComma } from '../../utils/separateComma';

interface Props {
  label: string;
  amount: number;
}

export default function LabeledAmount({ label, amount }: Props) {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <p>{label}</p>
      <p>{separateComma(amount)} 원</p>
    </div>
  );
}
