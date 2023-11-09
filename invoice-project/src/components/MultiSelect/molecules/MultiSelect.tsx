import { css } from '@emotion/react';
import Checkbox from '../../common/atoms/Checkbox';
import InputToAddOption from './InputToAddOption';

interface Props {
  options: any[];
  addOptionProps?: {
    label: string;
    addOption: (newOption: any) => void;
  };
}

export default function MultiSelect({ options, addOptionProps }: Props) {
  return (
    <div
      css={css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '4px',
      })}
    >
      {options.map((option) => (
        <Checkbox key={option} label={option} />
      ))}

      {addOptionProps ? <InputToAddOption label={addOptionProps.label} addOption={addOptionProps.addOption} /> : null}
    </div>
  );
}
