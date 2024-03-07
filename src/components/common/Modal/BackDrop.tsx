import { HTMLAttributes, useEffect } from 'react';
import { zIndexes } from '../../../styles/variables/zIndexes';

interface Props {
  isOpen: boolean;
  onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}

export default function BackDrop({ isOpen, onClick }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <div
      onClick={onClick}
      css={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: zIndexes.BACKDROP,
        display: isOpen ? 'block' : 'none',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    ></div>
  );
}
