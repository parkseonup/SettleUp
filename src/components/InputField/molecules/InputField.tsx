import { ReactNode } from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Slot from '../atoms/Slot';

interface Props {
  label?: ReactNode;
  controlAs?: ReactNode;
  children: ReactNode;
}

export default function InputField({ label, children }: Props) {
  return (
    <div
      css={{
        position: 'relative',
        height: '40px',

        '& > label ~ input': {
          paddingLeft: '104px',
        },
      }}
    >
      {label ? <Label>{label}</Label> : null}
      {children}
    </div>
  );
}

InputField.Input = Input;
InputField.Slot = Slot;
