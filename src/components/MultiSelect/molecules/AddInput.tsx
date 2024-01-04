import { useRef, KeyboardEvent } from 'react';
import InputField from '../../InputField/molecules/InputField';
import ButtonToAddOption from '../atoms/ButtonToAddOption';
import { colors } from '../../../styles/variables/colors';

interface Props {
  label: string;
  addOption: (newOption: any) => void;
}

export default function AddInput({ label, addOption }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddOption = () => {
    if (!inputRef.current) return;

    const value = inputRef.current.value.trim();

    addOption(value);
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const handleKeydownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.code !== 'Enter') return;

    handleAddOption();
  };

  return (
    <InputField
      css={{
        display: 'block',
        width: '104px',
        height: '32px',
      }}
    >
      <InputField.Input ref={inputRef} placeholder={label} onKeyDown={handleKeydownInput} />
      <InputField.Slot
        css={{
          right: 0,
        }}
      >
        {(isActive) => (
          <ButtonToAddOption
            onClick={handleAddOption}
            css={{ paddingRight: '16px', color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY }}
          />
        )}
      </InputField.Slot>
    </InputField>
  );
}
