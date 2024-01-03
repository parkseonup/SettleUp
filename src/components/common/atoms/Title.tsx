import { HTMLAttributes, ReactNode } from 'react';
import { title } from '../../../styles/variables/font';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  font?: keyof typeof title;
  children: ReactNode;
}

export default function Title({ as: Title, font, children, ...props }: Props) {
  return (
    <Title css={font ? title[font] : null} {...props}>
      {children}
    </Title>
  );
}
