import { InputHTMLAttributes, ReactNode, useState } from 'react';
import InputField from '../../InputField/molecules/InputField';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

export default function SingleInput({ label, ...props }: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <InputField label={label} isActive={isActive}>
      <InputField.Input {...props} onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)} />
    </InputField>
  );
}
