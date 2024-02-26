import { getId } from '../../utils/getId';
import { FocusEvent, useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import InputField from './InputField/InputField';
import { Props as InputProps } from './InputField/Input';

interface Props extends Omit<InputProps, 'isActive'> {
  label?: string;
}

export default function SingleInput({ label, ...props }: Props) {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = props.id ?? getId('input');

  useOutsideClick(containerRef, () => {
    if (setIsActive) setIsActive(false);
  });

  const handleFocus = () => {
    if (!containerRef.current) return;
    if (!setIsActive) return;

    setIsActive(true);
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement, Element>) => {
    if (!containerRef.current) return;
    if (!e.relatedTarget) return;
    if (containerRef.current.contains(e.relatedTarget)) return;
    if (!setIsActive) return;

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
      <InputField.Input id={id} {...props} />
    </InputField>
  );
}
