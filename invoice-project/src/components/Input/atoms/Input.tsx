import { css } from '@emotion/react';
import { colors } from '../../../styles/variables/colors';
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
          width: '100%',
          height: '100%',
          minHeight: '40px',
          padding: `0 16px 0 ${showLabel ? '140px' : '16px'}`,
          fontSize: '14px',
          color: colors.DARK_GRAY,
          textOverflow: 'ellipsis',
          backgroundColor: 'transparent',
          border: 0,
          borderRadius: '100px',
          outline: 'none',
          appearance: 'none',
          overflow: 'hidden',

          '&::placeholder': {
            color: colors.LIGHT_GRAY,
          },
        },
        style,
      )}
    />
  );
}
