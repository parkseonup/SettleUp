import Menu from '../Menu/Menu';
import Title from './Title';

export default function GlobalHeader() {
  return (
    <header
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        padding: '0 18px',
        color: 'inherit',
      }}
    >
      <Title
        as="h1"
        font="size200"
        insideStyle={{
          color: 'inherit',
        }}
      >
        정산하자
      </Title>
      <Menu />
    </header>
  );
}
