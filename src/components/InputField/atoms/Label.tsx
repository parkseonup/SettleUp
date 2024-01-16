import { LabelHTMLAttributes } from 'react';
import { colors } from '../../../styles/variables/colors';
import { useInputFieldContext } from './InputFieldContext';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({ children, ...props }: Props) {
  const { isActive } = useInputFieldContext();

  return (
    <label
      css={{
        display: 'flex',
        alignItems: 'center',
        width: '104px',
        fontSize: '14px',
        color: isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY,
      }}
      {...props}
    >
      {children}
    </label>
  );
}
