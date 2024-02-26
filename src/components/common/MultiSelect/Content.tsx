import { ReactNode } from 'react';
import Option from './Option';
import MultiSelect from './MultiSelect';
import { useMultiSelectContext } from './MultiSelectContext';
import getChildComponent from '../../../utils/getChildComponent';
import SublistItem from '../SublistItem';
import { visibilityHidden } from '../../../styles/common/displays';

interface BasicProps {
  title?: string;
  value: string[];
  options: string[];
  required?: boolean;
  children?: ReactNode;
  onChange: (value: string) => void;
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
  const { required } = useMultiSelectContext();

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
        <input
          type="text"
          css={visibilityHidden}
          defaultValue={value}
          required={required}
        />

        {options.map((option) => (
          <Option
            key={option}
            value={option}
            isActive={value?.includes(option)}
            onClick={(e) => onChange((e.target as HTMLButtonElement).value)}
          >
            {option}
          </Option>
        ))}

        {addInput ?? null}
      </div>
    </div>
  );
}
