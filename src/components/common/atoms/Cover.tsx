import { css } from '@emotion/react';
import { zIndexes } from '../../../styles/variables/zIndexes';
import { HTMLAttributes, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}

export default function Cover({ isOpen, onClick }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

  return (
    <div
      onClick={onClick}
      css={css({
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: zIndexes.COVER,
        display: isOpen ? 'block' : 'none',
        width: '100%',
        height: '100%',
      })}
    ></div>
  );
}
