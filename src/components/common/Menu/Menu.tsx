import Item from './Item';
import { zIndexes } from '../../../styles/variables/zIndexes';
import { colors } from '../../../styles/variables/colors';
import { visibilityHidden } from '../../../styles/common/displays';
import { navData } from '../../../router/router';
import { title } from '../../../styles/variables/font';
import useBlockingScroll from '../../../hooks/useBlockingScroll';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useRef } from 'react';

interface Props {
  onClose: (e: Event) => void;
}

export default function Menu({ onClose }: Props) {
  const LinksRef = useRef<HTMLUListElement>(null);

  useBlockingScroll(true);
  useOutsideClick(LinksRef, onClose);

  return (
    <div
      css={{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: zIndexes.MENU_WRAPPER,
        width: '100%',
        height: '100vh',
        padding: '120px 18px 20px',
        backgroundColor: colors.POINT,
      }}
    >
      <h2 css={visibilityHidden}>메뉴</h2>

      <ul
        ref={LinksRef}
        css={{ display: 'inline-flex', flexDirection: 'column', gap: '16px' }}
      >
        {navData.map(({ path, label }) => (
          <Item
            key={path}
            to={path}
            css={{
              ...title.size900,
              color: colors.WHITE,
            }}
          >
            {label}
          </Item>
        ))}
      </ul>
    </div>
  );
}
