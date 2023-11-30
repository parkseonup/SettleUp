import { useState } from 'react';
import SelectWrapper from './SelectWrapper';
import { createPortal } from 'react-dom';
import Cover from '../../common/atoms/Cover';

interface Props {
  id: string;
  label?: string;
  options?: string[];
}

export default function SelectField({ id, label, options }: Props) {
  const [selectedValue, setSelectedValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const deactivate = () => {
    setIsActive(false);
  };

  return (
    <>
      <SelectWrapper>
        <SelectWrapper.Trigger
          id={id}
          label={label}
          value={selectedValue}
          isActive={isActive}
          onClick={() => setIsActive(!isActive)}
        />

        {isActive ? (
          <SelectWrapper.OptionWrapper onClick={deactivate} onBlur={deactivate}>
            {options?.map((option) => (
              <SelectWrapper.Option key={option} onClick={() => setSelectedValue(option)}>
                {option}
              </SelectWrapper.Option>
            )) || null}
          </SelectWrapper.OptionWrapper>
        ) : null}
      </SelectWrapper>

      {createPortal(<Cover isOpen={isActive} onClick={deactivate} />, document.body)}
    </>
  );
}
