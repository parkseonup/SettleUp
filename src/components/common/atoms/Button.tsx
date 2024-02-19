import { ButtonHTMLAttributes } from 'react';
import { buttonColors } from '../../../styles/variables/colors';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  style?: keyof typeof buttonColors;
}

export default function Button({ style = 'fill', children, ...props }: Props) {
  return (
    <button
      type="button"
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '48px',
        fontSize: '14px',
        fontWeight: '400',
        borderRadius: '100px',
        ...buttonColors[style],
      }}
      {...props}
    >
      {children}
    </button>
  );
}
