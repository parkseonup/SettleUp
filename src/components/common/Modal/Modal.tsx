import { ReactNode } from 'react';
import { zIndexes } from '../../../styles/variables/zIndexes';
import { colors } from '../../../styles/variables/colors';
import { screenSize } from '../../../styles/common/screenSize';
import BottomButtons from './BottomButtons';
import Content from './Content';
import { getChildComponent } from '../../../utils/getChildComponent';
import CloseButton from './CloseButton';

interface Props {
  children: ReactNode;
}

export default function Modal({ children }: Props) {
  const closeButton = getChildComponent(children, CloseButton);
  const bottomButtons = getChildComponent(children, BottomButtons);
  const content = getChildComponent(children, Content);

  if (!content) throw new Error('Modal 내용이 없습니다.');

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
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: `100%`,
          padding: '12px',
          backgroundColor: colors.WHITE,
          borderRadius: '20px',
        }}
      >
        {content}
        {closeButton ?? null}
        {bottomButtons ?? null}
      </div>
    </div>
  );
}

Modal.Content = Content;
Modal.CloseButton = CloseButton;
Modal.BottomButtons = BottomButtons;
