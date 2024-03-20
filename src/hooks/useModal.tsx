import { ReactNode, useMemo, useState } from 'react';
import Modal from '../components/common/Modal/Modal';
import { getId } from '../utils/getId';

type ModalList = { id: string; content: ReactNode; show: boolean }[];

// TODO: 닫기, footer 추가 구현
export default function useModal() {
  const [modalList, setModalList] = useState<ModalList>([]);

  const ModalComponent = useMemo(
    () =>
      function _Modal() {
        const filteredModal = modalList.filter(({ show }) => show);
        console.log('[NewModal]');

        return filteredModal.map(({ id, content, show }) => (
          <Modal key={id} isOpen={show} onClose={() => {}}>
            {content}
          </Modal>
        ));
      },
    [modalList],
  );

  const createModal = (
    content: ReactNode,
    options?: { onClose?: () => void; footer?: ReactNode },
  ) => {
    const id = `modal_${getId()}`;

    setModalList((prev) => [
      ...prev,
      {
        id,
        content,
        show: true,
      },
    ]);
  };

  return {
    Modal: ModalComponent,
    createModal,
  };
}
