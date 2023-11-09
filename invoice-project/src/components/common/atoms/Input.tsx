import { css } from '@emotion/react';
import { Style } from '../../../types/Style';
import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import getFilteredProps from '../../../utils/getFilteredProps';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  customStyle?: Style;
}

export default forwardRef(function Input(props: Props, ref?: ForwardedRef<HTMLInputElement>) {
  const filteredProps = getFilteredProps(props, ['customStyle']);

  return <input ref={ref || null} {...filteredProps} type={props.type || 'text'} css={css(props.customStyle)} />;
});
