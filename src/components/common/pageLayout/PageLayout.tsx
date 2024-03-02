import { colors } from '../../../styles/variables/colors';
import GlobalHeader from '../GlobalHeader';
import PageTitle, { Props as TitleProps } from './PageTitle';

interface Props extends TitleProps {
  mode?: 'point' | 'default';
}

const modeColor = {
  default: {
    color: colors.BLACK,
    backgroundColor: colors.WHITE,
  },
  point: {
    color: colors.WHITE,
    backgroundColor: colors.POINT,
  },
};

export default function PageLayout({
  title,
  description,
  mode = 'default',
  children,
  ...props
}: Props) {
  return (
    <div css={modeColor[mode]} {...props}>
      <GlobalHeader />
      <div
        css={{
          padding: '20px 18px',
        }}
      >
        <PageTitle
          title={title}
          description={description}
          css={{ marginBottom: '40px' }}
        />
        <div>{children}</div>
      </div>
    </div>
  );
}
