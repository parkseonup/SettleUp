import { ButtonHTMLAttributes } from 'react';
import { BiX } from 'react-icons/bi';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function CloseButton(props: Props) {
  return (
    <button
      css={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        fontSize: '24px',
      }}
      {...props}
    >
      <BiX />
    </button>
  );
}
