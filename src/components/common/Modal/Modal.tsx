import { ReactNode } from 'react';
import { BiX } from 'react-icons/bi';
import { zIndexes } from '../../../styles/variables/zIndexes';
import { colors } from '../../../styles/variables/colors';
import { screenSize } from '../../../styles/common/screenSize';

interface Props {
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

// NOTE: modal ui
// NOTE: backdrop 열고 닫힘 관리
// TODO: Modal.Footer 만들기 -> onClick시 모달 close 되게 이벤트 붙이기
export default function Modal({ footer, children, onClose }: Props) {
  return (
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
  );
}
