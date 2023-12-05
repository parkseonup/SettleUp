import { HTMLAttributes, ReactNode } from 'react';
import { title } from '../../../styles/variables/font';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4';
  font: keyof typeof title;
  children: ReactNode;
}

export default function Title({ as: Title, font, children }: Props) {
  return <Title css={title[font]}>{children}</Title>;
}
