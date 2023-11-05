import { css } from '@emotion/react';
import { Dispatch, SetStateAction } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
import { zIndexes } from '../../../styles/variables/zIndexes';
import { colors } from '../../../styles/variables/colors';

interface MenuButtonProps {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MenuButton({ showMenu, setShowMenu }: MenuButtonProps) {
  return (
    <button
      onClick={() => setShowMenu(!showMenu)}
      aria-label="메뉴 보기"
      css={css({
        position: 'relative',
        zIndex: zIndexes.MENU_BUTTON,
        fontSize: '24px',
        color: showMenu ? colors.WHITE : colors.BLACK,
      })}
    >
      {showMenu ? <BiX /> : <BiMenu />}
    </button>
  );
}
