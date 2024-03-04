import { zIndexes } from '../../styles/variables/zIndexes';
import { colors } from '../../styles/variables/colors';
import { visibilityHidden } from '../../styles/common/displays';
import { navData } from '../../router/router';
import { title } from '../../styles/variables/font';

import { BiMenu, BiX } from 'react-icons/bi';
import List from './List';
import Item from './Item';
import Dropdown from '../common/Dropdown/Dropdown';

// FIXME: 메뉴 열렸을 때 스크롤 안되게 하기
export default function Menu() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        {({ isActive, setIsActive }) => {
          return (
            <button
              aria-label="메뉴 보기"
              css={{
                position: 'relative',
                zIndex: zIndexes.MENU_BUTTON,
                fontSize: '24px',
                color: isActive ? colors.WHITE : 'inherit',
              }}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? (
                <BiX css={{ pointerEvents: 'none' }} />
              ) : (
                <BiMenu css={{ pointerEvents: 'none' }} />
              )}
            </button>
          );
        }}
      </Dropdown.Trigger>
      <Dropdown.Portal as>
        {({ isActive }) => {
          return (
            <div
              css={{
                position: 'fixed',
                top: 0,
                right: isActive ? '0' : '-100%',
                zIndex: zIndexes.MENU_WRAPPER,
                width: '100%',
                height: '100vh',
                padding: '80px 18px 20px',
                backgroundColor: colors.POINT,
              }}
            >
              <h2 css={visibilityHidden}>메뉴</h2>

              <List
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
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
              </List>
            </div>
          );
        }}
      </Dropdown.Portal>
    </Dropdown>
  );
}
