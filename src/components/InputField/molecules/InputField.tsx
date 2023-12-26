import { ReactNode } from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Slot from '../atoms/Slot';
import getChildComponent from '../../../utils/getChildComponent';
import cloneElement from '../../../utils/cloneElement';

interface Props {
  label?: ReactNode;
  isActive?: boolean;
  children: ReactNode;
}

export default function InputField({ label, isActive, children }: Props) {
  const input = getChildComponent(children, Input);
  const slot = getChildComponent(children, Slot);

  if (!input) throw new Error('InputField에 Input이 정의되지 않았습니다.');

  return (
    <div
      css={{
        position: 'relative',
        height: '40px',
      }}
    >
      {label ? (
        <>
          <Label isActive={isActive}>{label}</Label>
          {cloneElement(input, {
            isActive,
            css: [
              input.props.css,
              {
                paddingLeft: '104px',
              },
            ],
          })}
        </>
      ) : (
        input
      )}
      {slot ? slot : null}
    </div>
  );
}

InputField.Input = Input;
InputField.Slot = Slot;
