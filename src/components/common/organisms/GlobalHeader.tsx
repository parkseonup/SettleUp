import { colors } from '../../../styles/variables/colors';
import Menu from '../../Menu/molecules/Menu';
import Title from '../atoms/Title';

export default function GlobalHeader() {
  return (
    <header
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        padding: '0 18px',
        color: colors.BLACK,
      }}
    >
      <Title as="h1" font="size200">
        정산하자
      </Title>
      <Menu />
    </header>
  );
}
