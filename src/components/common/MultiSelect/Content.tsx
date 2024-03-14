import { MouseEvent, ReactNode, useState } from 'react';
import Option from './Option';
import MultiSelect from './MultiSelect';
import { useMultiSelectContext } from './MultiSelectContext';
import { getChildComponent } from '../../../utils/getChildComponent';
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
  const [inputKey, setInputKey] = useState<number>(() => Date.now());

  const _onChange = (e: MouseEvent<HTMLButtonElement>) => {
    setInputKey(Date.now());
    onChange((e.target as HTMLButtonElement).value);
  };

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
          key={inputKey}
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
            onClick={_onChange}
          >
            {option}
          </Option>
        ))}

        {addInput ?? null}
      </div>
    </div>
  );
}
