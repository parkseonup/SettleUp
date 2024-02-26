import { useRef, KeyboardEvent, useState } from 'react';
import InputField from '../InputField/molecules/InputField';
import ButtonToAddOption from './ButtonToAddOption';
import { colors } from '../../styles/variables/colors';

interface Props {
  label: string;
  addOption: (newOption: any) => void;
}

export default function AddInput({ label, addOption }: Props) {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const _addOption = () => {
    if (!inputRef.current) return;

    const value = inputRef.current.value.trim();

    if (!value) return;

    addOption(value);
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const onKeydownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.code !== 'Enter') return;

    _addOption();
  };

  return (
    <>
      <InputField
        isActive={isActive}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        css={{
          width: '112px',
          height: '32px',
          gap: '4px',
        }}
      >
        <InputField.Input ref={inputRef} placeholder={label} onKeyDown={onKeydownInput} />
        <InputField.Slot
          css={{
            width: '32px',
          }}
        >
          {(isActive) => (
            <ButtonToAddOption
              onClick={_addOption}
              css={{
                color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
              }}
            />
          )}
        </InputField.Slot>
      </InputField>
    </>
  );
}
