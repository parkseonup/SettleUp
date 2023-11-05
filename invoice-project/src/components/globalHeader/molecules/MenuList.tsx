import { Link } from 'react-router-dom';
import { NavData } from '../../../router';
import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';

interface MenuListProps {
  menuData: NavData;
  listStyle?: Array<CSSInterpolation>;
  textStyle?: Array<CSSInterpolation>;
}

export default function MenuList({ menuData, listStyle, textStyle }: MenuListProps) {
  return menuData.length > 0 ? (
    <ul css={css({ display: 'flex', flexDirection: 'column', gap: '16px' }, listStyle)}>
      {menuData.map(({ path, label }) => (
        <li key={label}>
          <Link
            to={path}
            css={css({ display: 'inline-block', padding: '4px 8px', marginLeft: '-8px', fontWeight: 500 }, textStyle)}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  ) : null;
}
