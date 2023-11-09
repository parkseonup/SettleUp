import { useState } from 'react';
import Input, { Props as InputProps } from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';
import InputWrapper from '../../common/atoms/InputWrapper';
import getFilteredProps from '../../../utils/getFilteredProps';
import { css } from '@emotion/react';
import { Style } from '../../../types/Style';

export interface Props extends InputProps {
  label?: string;
  showLabel?: boolean;
  customStyle?: Style;
}

export default function SingleInput(props: Props) {
  const [isActive, setIsActive] = useState(false);
  const inputProps = getFilteredProps(props, ['label', 'showLabel', 'children']);
  const showLabel = !!props.label && (props.showLabel === undefined || props.showLabel);
  console.log(showLabel);

  return (
    <InputWrapper isActive={isActive} customStyle={css(props.customStyle)}>
      {props.label ? (
        <Label htmlFor={props.id} isActive={isActive} customStyle={showLabel ? null : visibilityHidden}>
          {props.label}
        </Label>
      ) : null}
      <Input
        {...inputProps}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        customStyle={{ paddingLeft: showLabel ? '140px' : '16px' }}
      />
    </InputWrapper>
  );
}
