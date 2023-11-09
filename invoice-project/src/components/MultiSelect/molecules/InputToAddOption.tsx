import ButtonToAddOption from '../atoms/ButtonToAddOption';
import InputWrapper from '../../common/atoms/InputWrapper';
import { useRef, useState, KeyboardEvent } from 'react';
import Input, { Props as InputProps } from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';
import getFilteredProps from '../../../utils/getFilteredProps';
import { css } from '@emotion/react';
import { Style } from '../../../types/Style';

interface Props extends InputProps {
  label: string;
  customStyle?: Style;
  addOption: (newOption: any) => void;
}

export default function InputToAddOption(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const inputProps = getFilteredProps(props, ['label', 'onClickButton', 'customStyle', 'addOption']);

  const addOption = () => {
    if (!inputRef.current) return;

    const value = inputRef.current.value.trim();

    props.addOption(value);
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const handleKeydownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.code !== 'Enter') return;

    addOption();
  };

  return (
    <InputWrapper
      isActive={isActive}
      customStyle={css(
        {
          display: 'inline-block',
          width: '104px',
          height: '32px',
        },
        props.customStyle,
      )}
    >
      <Label customStyle={visibilityHidden}>{props.label}</Label>
      <Input
        {...inputProps}
        ref={inputRef}
        placeholder={props.label}
        onKeyDown={handleKeydownInput}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        customStyle={css(
          {
            paddingRight: '32px',
          },
          props.customStyle,
        )}
      />
      <ButtonToAddOption isActive={isActive} onClick={addOption} />
    </InputWrapper>
  );
}
