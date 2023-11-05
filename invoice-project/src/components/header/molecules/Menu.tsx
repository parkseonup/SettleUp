import { css } from '@emotion/react';
import { container } from '../../../styles/common/layout/container';
import { zIndexs } from '../../../styles/variables/zIndexs';
import { colors } from '../../../styles/variables/colors';
import { NavData, navData } from '../../../router';
import MenuList from './MenuList';
import { visibilityHidden } from '../../../styles/common/display/visibilityHidden';

interface MenuProps {
  showMenu: boolean;
}

export default function Menu({ showMenu }: MenuProps) {
  const [defaultMenu, userMenu] = navData.reduce<[NavData, NavData]>(
    (result, data) => {
      if (data.aboutUser) result[1].push(data);
      else result[0].push(data);

      return result;
    },
    [[], []],
  );

  return (
    <nav
      css={css(container, {
        position: 'fixed',
        top: 0,
        right: showMenu ? '0' : '-100%',
        zIndex: zIndexs.MENU_WRAPPER,
        width: '100%',
        height: '100vh',
        paddingTop: '80px',
        backgroundColor: colors.POINT,
      })}
    >
      <h2 css={css(visibilityHidden)}>메뉴</h2>

      <MenuList
        menuData={defaultMenu}
        textStyle={{
          fontSize: '24px',
          color: colors.WHITE,
        }}
      />
      <MenuList
        menuData={userMenu}
        listStyle={{
          paddingTop: '20px',
          marginTop: '20px',
          borderTop: `1px solid ${colors.LIGHT_GRAY}`,
        }}
        textStyle={{
          fontSize: '16px',
          color: colors.LIGHT_GRAY,
        }}
      />
    </nav>
  );
}
