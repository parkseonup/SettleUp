import { LabelHTMLAttributes } from 'react';
import { colors } from '../../../styles/variables/colors';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  isActive?: boolean;
}

export default function Label({ children, isActive, ...props }: Props) {
  return (
    <label
      css={{
        position: 'absolute',
        top: '50%',
        left: '16px',
        width: '72px',
        fontSize: '14px',
        color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }}
      {...props}
    >
      {children}
    </label>
  );
}
