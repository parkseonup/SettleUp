import { Link, LinkProps } from 'react-router-dom';

interface Props extends LinkProps {}

export default function Item({ to, children, ...props }: Props) {
  return (
    <li>
      <Link to={to} css={{ display: 'inline-block', padding: '4px 8px', marginLeft: '-8px' }} {...props}>
        {children}
      </Link>
    </li>
  );
}
