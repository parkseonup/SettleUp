import { HTMLAttributes, ReactNode } from 'react';
import { title } from '../../styles/variables/font';
import { Style } from '../../types/Style';
import { css } from '@emotion/react';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  font?: keyof typeof title;
  insideStyle?: Style;
  children: ReactNode;
}

export default function Title({
  as: Title,
  font,
  insideStyle,
  children,
  ...props
}: Props) {
  return (
    <Title css={css(font ? title[font] : null, insideStyle)} {...props}>
      {children}
    </Title>
  );
}
