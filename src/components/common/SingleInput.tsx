import { getId } from '../../utils/getId';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import InputField from './InputField/InputField';
import { Props as InputProps } from './InputField/Input';

interface Props extends Omit<InputProps, 'isActive'> {
  label?: string;
}

export default forwardRef(function SingleInput(
  { label, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = props.id ?? getId('input');

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <InputField
      isActive={isActive}
      ref={containerRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      css={{
        paddingRight: '32px',
      }}
    >
      {label ? <InputField.Label htmlFor={id}>{label}</InputField.Label> : null}
      <InputField.Input ref={ref} id={id} {...props} />
    </InputField>
  );
});
