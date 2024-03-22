import { zIndexes } from '../../../styles/variables/zIndexes';
import { colors } from '../../../styles/variables/colors';
import { visibilityHidden } from '../../../styles/common/displays';
import { navData } from '../../../router/router';
import { title } from '../../../styles/common/font';
import useBlockingScroll from '../../../hooks/useBlockingScroll';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useRef } from 'react';
import { screenSize } from '../../../styles/common/screenSize';
import { Link } from 'react-router-dom';

interface Props {
  onClose: (e: Event) => void;
}

export default function Menu({ onClose }: Props) {
  const navRef = useRef<HTMLUListElement>(null);

  useBlockingScroll(true);
  useOutsideClick(navRef, onClose);

  return (
    <div
      css={{
        position: 'fixed',
        top: 0,
        left: '50%',
        zIndex: zIndexes.MENU_WRAPPER,
        ...screenSize,
        height: '100vh',
        padding: '120px 0 20px',
        backgroundColor: colors.POINT,
        transform: 'translateX(-50%)',
      }}
    >
      <nav
        ref={navRef}
        css={{
          padding: screenSize.paddingLeft,
          display: 'inline-block',
        }}
      >
        <h2 css={visibilityHidden}>메뉴</h2>

        <ul
          css={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {navData.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              css={{
                display: 'inline-block',
                padding: '4px 8px',
                marginLeft: '-8px',
                ...title[900],
                color: colors.WHITE,
              }}
            >
              {label}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}
