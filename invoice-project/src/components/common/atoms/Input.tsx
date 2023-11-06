import { css } from '@emotion/react';
import { Style } from '../../../types/Style';
import { InputHTMLAttributes } from 'react';
import getFilteredProps from '../../../utils/getFilteredProps';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  customStyle?: Style;
  showLabel?: boolean;
}

export default function Input(props: Props) {
  const filteredProps = getFilteredProps(props, ['showLabel', 'customStyle']);

  return (
    <input
      {...filteredProps}
      type={props.type || 'text'}
      css={css(
        {
          paddingLeft: props.showLabel ? '140px' : '16px',
        },
        props.customStyle,
      )}
    />
  );
}
