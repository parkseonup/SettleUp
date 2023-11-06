import { useState } from 'react';
import Input, { Props as InputProps } from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';
import InputWrapper from '../../common/atoms/InputWrapper';

export interface Props extends InputProps {
  label?: string;
  showLabel?: boolean;
}

export default function SingleInput(props: Props) {
  const [isActive, setIsActive] = useState(false);
  const showLabel = !!props.label && (props.showLabel === undefined || props.showLabel);

  return (
    <InputWrapper isActive={isActive}>
      {props.label ? (
        <Label htmlFor={props.id} isActive={isActive} customStyle={showLabel ? null : visibilityHidden}>
          {props.label}
        </Label>
      ) : null}
      <Input
        id={props.id}
        type={props.type}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        customStyle={{ paddingLeft: showLabel ? '140px' : '16px' }}
      />
    </InputWrapper>
  );
}
