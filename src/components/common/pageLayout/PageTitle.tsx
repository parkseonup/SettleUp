import { HTMLAttributes } from 'react';
import Description from './Description';
import Title from '../Title';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export default function PageTitle({ title, description, ...props }: Props) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
      {...props}
    >
      <Title
        as="h2"
        font="size900"
        insideStyle={{
          color: 'inherit',
        }}
      >
        {title}
      </Title>
      <Description>{description}</Description>
    </div>
  );
}
