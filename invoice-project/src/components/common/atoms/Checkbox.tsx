import Input, { Props as InputProps } from './Input';
import { Style } from '../../../types/Style';
import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
import getFilteredProps from '../../../utils/getFilteredProps';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';

interface Props extends InputProps {
  id: string;
  label: string;
  customStyle?: Style;
}

export default function Checkbox(props: Props) {
  const inputProps = getFilteredProps(props, ['label', 'customStyle']);

  return (
    <div
      css={css({
        display: 'inline-block',
      })}
    >
      <Input type="checkbox" {...inputProps} css={css(visibilityHidden)} />
      <label
        htmlFor={props.id}
        css={css(
          {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '32px',
            padding: '0 16px',
            fontSize: '14px',
            color: colors.BLACK,
            textAlign: 'center',
            backgroundColor: colors.WHITE,
            border: `1px solid ${colors.LIGHT_GRAY}`,
            borderRadius: '100px',
            cursor: 'pointer',

            'input:checked + &': {
              color: colors.WHITE,
              backgroundColor: colors.BLACK,
              borderColor: colors.BLACK,
            },
          },
          props.customStyle,
        )}
      >
        {props.label}
      </label>
    </div>
  );
}
