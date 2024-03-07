import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BiX } from 'react-icons/bi';
import { zIndexes } from '../../../styles/variables/zIndexes';
import { colors } from '../../../styles/variables/colors';
import BackDrop from './BackDrop';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

export default function Modal({ isOpen, footer, children, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    isOpen &&
    createPortal(
      <>
        <div
          ref={modalRef}
          css={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: zIndexes.MODAL,
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - (18px * 2))',
            padding: '12px',
            textAlign: 'center',
            backgroundColor: colors.WHITE,
            borderRadius: '20px',
            transform: 'translate(-50%, -50%)',
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
        <BackDrop isOpen={isOpen} />
      </>,
      document.body,
    )
  );
}
