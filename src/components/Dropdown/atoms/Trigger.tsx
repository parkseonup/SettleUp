import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Trigger({ children }: Props) {
  return <div>{children}</div>;
}
