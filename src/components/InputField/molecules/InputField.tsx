import { HTMLAttributes, ReactNode, useState } from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Slot from '../atoms/Slot';
import getChildComponent from '../../../utils/getChildComponent';
import cloneElement from '../../../utils/cloneElement';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  children: ReactNode;
}

export default function InputField({ label, children, ...props }: Props) {
  const [isActive, setIsActive] = useState(false);
  const input = getChildComponent(children, Input);
  const slot = getChildComponent(children, Slot);

  if (!input) throw new Error('InputField에 Input이 정의되지 않았습니다.');

  return (
    <div
      css={{
        position: 'relative',
        height: '40px',
      }}
      {...props}
    >
      {label ? (
        <>
          <Label isActive={isActive}>{label}</Label>
          {cloneElement(input, {
            isActive,
            onFocus: () => setIsActive(true),
            onBlur: () => setIsActive(false),
            css: [
              input.props.css,
              {
                paddingLeft: '104px',
              },
            ],
          })}
        </>
      ) : (
        cloneElement(input, {
          isActive,
          onFocus: () => setIsActive(true),
          onBlur: () => setIsActive(false),
        })
      )}
      {slot
        ? cloneElement(slot, {
            isActive,
          })
        : null}
    </div>
  );
}

InputField.Input = Input;
InputField.Slot = Slot;
