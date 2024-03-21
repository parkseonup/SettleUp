import Description from './Description';
import Title from '../Title';

export interface Props {
  title: string;
  description?: string;
}

// NOTE: title ui
export default function PageHeader({ title, description }: Props) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '40px',
      }}
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
      {description ? <Description>{description}</Description> : null}
    </div>
  );
}
