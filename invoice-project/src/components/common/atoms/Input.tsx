import { css } from '@emotion/react';
import { Style } from '../../../types/Style';
import { InputHTMLAttributes } from 'react';
import getFilteredProps from '../../../utils/getFilteredProps';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  customStyle?: Style;
}

export default function Input(props: Props) {
  const filteredProps = getFilteredProps(props, ['customStyle']);

  return (
    <input {...filteredProps} name={props.name || props.id} type={props.type || 'text'} css={css(props.customStyle)} />
  );
}
