import { ReactNode } from 'react';
import Option from '../atoms/Option';
import getChildComponent from '../../../utils/getChildComponent';
import MultiSelect from './MultiSelect';
import SublistItem from '../../common/atoms/SublistItem';

interface BasicProps {
  title?: string;
  value: string[];
  options: string[];
  onChange: (value: string) => void;
  children?: ReactNode;
}

interface UseSummaryProps extends BasicProps {
  title: string;
  summary: string | number | null;
}

type Props = BasicProps | UseSummaryProps;

export default function Content({
  title,
  options,
  value,
  children,
  onChange,
  ...props
}: Props) {
  const addInput = getChildComponent(children, MultiSelect.AddInput);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '20px',
      }}
    >
      {title ? (
        <SublistItem title={title}>
          {'summary' in props ? <p>{props.summary}</p> : null}
        </SublistItem>
      ) : null}

      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {options.map((option) => (
          <Option
            key={option}
            value={option}
            checked={value.includes(option)}
            onChange={(e) => onChange(e.target.value)}
          >
            {option}
          </Option>
        ))}

        {addInput ?? null}
      </div>
    </div>
  );
}
