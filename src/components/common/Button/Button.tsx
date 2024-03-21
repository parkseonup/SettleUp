import { ButtonHTMLAttributes } from 'react';
import { buttonColors, defaultButtonStyle } from '../../../styles/common/buttons';
import { css } from '@emotion/react';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  style?: keyof typeof buttonColors;
}

// NOTE: button ui
export default function Button({ style = 'fill', children, ...props }: Props) {
  return (
    <button type="button" css={css(defaultButtonStyle, buttonColors[style])} {...props}>
      {children}
    </button>
  );
}
