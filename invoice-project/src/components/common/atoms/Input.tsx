import { css } from '@emotion/react';
import { Style } from '../../../types/Style';
import { HTMLAttributes, InputHTMLAttributes } from 'react';

export interface Props {
  id?: HTMLAttributes<HTMLInputElement>['id'];
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  attributes?: Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>;
  style?: Style;
  showLabel?: boolean;
}

export default function Input({ id, type, attributes, showLabel = true, style }: Props) {
  return (
    <input
      id={id}
      type={type || 'text'}
      {...attributes}
      css={css(
        {
          paddingLeft: showLabel ? '140px' : '16px',
        },
        style,
      )}
    />
  );
}
