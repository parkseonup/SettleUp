import { useEffect, useRef, useState } from 'react';
import { colors } from '../../../styles/variables/colors';
import { zIndexes } from '../../../styles/variables/zIndexes';
import Menu from './Menu';
import Title from '../Title';
import { BiMenu, BiX } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

export default function GlobalHeader() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const onClose = (e: Event) => {
    if (headerRef.current && headerRef.current.contains(e.target as HTMLElement)) return;

    setShowMenu(false);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [location.key]);

  return (
    <>
      <header
        ref={headerRef}
        css={{
          position: 'relative',
          zIndex: zIndexes.MENU_BUTTON,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          color: showMenu ? colors.WHITE : 'inherit',
        }}
      >
        <Link to="/create">
          <Title
            as="h1"
            font="size200"
            insideStyle={{
              color: 'inherit',
            }}
          >
            정산하자
          </Title>
        </Link>

        <button
          aria-label="메뉴 보기"
          css={{
            position: 'relative',
            fontSize: '24px',
            color: 'inherit',
          }}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <BiX css={{ pointerEvents: 'none' }} />
          ) : (
            <BiMenu css={{ pointerEvents: 'none' }} />
          )}
        </button>
      </header>
      {showMenu && <Menu onClose={onClose} />}
    </>
  );
}
