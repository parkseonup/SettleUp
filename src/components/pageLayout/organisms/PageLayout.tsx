import PageTitle, { Props as TitleProps } from '../molecules/PageTitle';

interface Props extends TitleProps {}

export default function PageLayout({ title, description, children, ...props }: Props) {
  return (
    <div
      css={{
        padding: '20px 16px',
      }}
      {...props}
    >
      <PageTitle title={title} description={description} css={{ marginBottom: '40px' }} />
      <div>{children}</div>
    </div>
  );
}
