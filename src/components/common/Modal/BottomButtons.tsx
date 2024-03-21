import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function BottomButtons({ children, ...props }: Props) {
  return <div {...props}>{children}</div>;
}
