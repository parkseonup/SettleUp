import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { BiX } from 'react-icons/bi';
import { zIndexes } from '../../../styles/variables/zIndexes';
import { colors } from '../../../styles/variables/colors';
import BackDrop from './BackDrop';
import { screenSize } from '../../../styles/common/screenSize';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

export default function Modal({ isOpen, footer, children, onClose }: Props) {
  return (
    isOpen &&
    createPortal(
      <>
        <div
          css={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: zIndexes.MODAL,
            ...screenSize,
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              width: `100%`,
              padding: '12px',
              backgroundColor: colors.WHITE,
              borderRadius: '20px',
            }}
          >
            <button
              css={{
                marginLeft: 'auto',
                fontSize: '24px',
              }}
              onClick={() => onClose()}
            >
              <BiX />
            </button>
            <div
              css={{
                padding: '24px 0 40px',
              }}
            >
              {children}
            </div>
            {footer}
          </div>
        </div>

        <BackDrop isOpen={isOpen} />
      </>,
      document.body,
    )
  );
}
