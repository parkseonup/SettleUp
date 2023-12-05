import { HTMLAttributes, ReactNode } from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Control from '../atoms/Control';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  isActive?: boolean;
  controlAs?: ReactNode;
}

export default function InputField({ label, isActive, children, controlAs, ...props }: Props) {
  return (
    <div
      css={{
        position: 'relative',
        height: '40px',

        '& > label ~ input': {
          paddingLeft: '104px',
        },

        '& > div ~ input': {
          paddingRight: '64px',
        },
      }}
      {...props}
    >
      {label ? <Label isActive={isActive}>{label}</Label> : null}
      {controlAs ? <Control>{controlAs}</Control> : null}
      {children}
    </div>
  );
}

InputField.Input = Input;
