import { zIndexes } from '../../../styles/variables/zIndexes';
import { colors } from '../../../styles/variables/colors';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';
import { NavData, navData } from '../../../router';
import { title } from '../../../styles/variables/font';
import Dropdown from '../../Dropdown/molecules/Dropdown';
import { BiMenu, BiX } from 'react-icons/bi';
import List from '../atoms/List';
import Item from '../atoms/Item';
import { useMemo } from 'react';

interface Props {}

export default function Menu({ ...props }: Props) {
  const [defaultMenu, userMenu] = useMemo(
    () =>
      navData.reduce<[NavData, NavData]>(
        (result, data) => {
          data.aboutUser ? result[1].push(data) : result[0].push(data);
          return result;
        },
        [[], []],
      ),
    [navData],
  );

  return (
    <Dropdown {...props}>
      <Dropdown.Trigger>
        {({ isActive, setIsActive }) => {
          return (
            <button
              aria-label="메뉴 보기"
              css={{
                position: 'relative',
                zIndex: zIndexes.MENU_BUTTON,
                fontSize: '24px',
                color: isActive ? colors.WHITE : colors.BLACK,
              }}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? <BiX css={{ pointerEvents: 'none' }} /> : <BiMenu css={{ pointerEvents: 'none' }} />}
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
                {defaultMenu.map(({ path, label }) => (
                  <Item
                    key={path}
                    to={path}
                    css={{
                      ...title.size90,
                      color: colors.WHITE,
                    }}
                  >
                    {label}
                  </Item>
                ))}
              </List>

              <List
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  paddingTop: '20px',
                  marginTop: '20px',
                  borderTop: `1px solid ${colors.LIGHT_GRAY}`,
                }}
              >
                {userMenu.map(({ path, label }) => (
                  <Item
                    key={path}
                    to={path}
                    css={{
                      ...title.size10,
                      color: colors.LIGHT_GRAY,
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
