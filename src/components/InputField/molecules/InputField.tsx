import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Slot from '../atoms/Slot';
import { colors } from '../../../styles/variables/colors';
import { InputFieldContext } from '../atoms/InputFieldContext';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  children: ReactNode;
}

const InputFieldContainer = forwardRef(function InputFieldContainer(
  { isActive = false, children, ...props }: Props,
  ref?: ForwardedRef<HTMLDivElement>,
) {
  return (
    <InputFieldContext.Provider value={{ isActive }}>
      <div
        ref={ref}
        css={{
          position: 'relative',
          display: 'flex',
          gap: '16px',
          height: '40px',
          padding: '0 16px',
          border: `1px solid ${isActive ? colors.DARK_GRAY : colors.LIGHT_GRAY}`,
          borderRadius: '20px',
        }}
        {...props}
      >
        {children}
      </div>
    </InputFieldContext.Provider>
  );
});

const InputField = Object.assign(InputFieldContainer, {
  Label: Label,
  Input: Input,
  Slot: Slot,
});
export default InputField;
