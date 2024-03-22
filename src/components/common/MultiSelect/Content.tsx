import { MouseEvent, ReactNode, useState } from 'react';
import Option from './Option';
import { useMultiSelectContext } from './MultiSelectContext';
import { getChildComponent } from '../../../utils/getChildComponent';
import SublistItem from '../SublistItem';
import { visibilityHidden } from '../../../styles/common/displays';
import AddOptionInput from './AddOptionInput';

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
  const addOptionInput = getChildComponent(children, AddOptionInput);
  const { required } = useMultiSelectContext();
  const [inputKey, setInputKey] = useState<number>(() => Date.now()); // input의 defaultValue attirbute는 초기값을 유지한다. 따라서 변경된 value를 전달해도 요소 자체가 변경되지 않았기 때문에 defaultValue를 유지하려는 특성이 있어 required 상태인지 체크하기가 어렵다. required 상태를 올바르게 체크할 수 있도록 컴포넌트 key를 변경하여 input 요소 자체를 파기하고 새로 생성하도록 한다. -> attribute와 Property의 차이 + react의 재조정 알고리즘(key)

  const _onChange = (e: MouseEvent<HTMLButtonElement>) => {
    onChange((e.target as HTMLButtonElement).value);
    setInputKey(Date.now());
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

        {addOptionInput ?? null}
      </div>
    </div>
  );
}
