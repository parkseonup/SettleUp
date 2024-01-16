/**
 * id값 전달 받으면 그걸로 통일,
 * 전달 못받으면 임의 id 생성해서 label과 input 맞추기
 */

import { Props as InputProps } from '../../InputField/atoms/Input';
import InputField from '../../InputField/molecules/InputField';
import { getId } from '../../../utils/getId';
import { FocusEvent, useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

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
    >
      {label ? <InputField.Label htmlFor={id}>{label}</InputField.Label> : null}
      <InputField.Input id={id} {...props} />
    </InputField>
  );
}
