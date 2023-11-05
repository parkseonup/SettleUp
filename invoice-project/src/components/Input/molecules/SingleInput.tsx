import Input, { Props as InputProps } from '../atoms/Input';
import Label from '../atoms/Label';

interface Props extends InputProps {
  label: string;
}

export default function SingleInput({ id, attributes, label, showLabel }: Props) {
  return (
    <>
      <Label htmlFor={id} showLabel={showLabel}>
        {label}
      </Label>
      <Input id={id} attributes={attributes} showLabel={showLabel} />
    </>
  );
}
