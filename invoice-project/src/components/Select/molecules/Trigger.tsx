import { colors } from '../../../styles/variables/colors';
import Input, { Props as InputProps } from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import { BiChevronRight } from 'react-icons/bi';
import { css } from '@emotion/react';
import InputWrapper from '../../common/atoms/InputWrapper';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';
import getFilteredProps from '../../../utils/getFilteredProps';

interface Props extends InputProps {
  label?: string;
  isActive?: boolean;
  showLabel?: boolean;
}

export default function Trigger(props: Props) {
  const inputProps = getFilteredProps(props, ['label', 'isActive', 'showLabel']);
  const showLabel = !!props.label && (props.showLabel === undefined || props.showLabel);

  return (
    <InputWrapper
      isActive={props.isActive}
      customStyle={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '0 16px',

        'label, svg': {
          flexShrink: 0,
        },
      })}
    >
      {props.label ? (
        <Label
          htmlFor={props.id}
          isActive={props.isActive}
          customStyle={css(
            {
              position: 'static',
              transform: 'translateY(0)',
            },
            showLabel ? null : visibilityHidden,
          )}
        >
          {props.label}
        </Label>
      ) : null}
      <Input
        {...inputProps}
        readOnly={true}
        customStyle={{
          padding: '0 24px 0 0',
          textAlign: 'center',
        }}
      />
      <BiChevronRight
        css={css({
          position: 'absolute',
          top: '50%',
          right: '12px',
          fontSize: '18px',
          color: props.isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        })}
      />
    </InputWrapper>
  );
}
