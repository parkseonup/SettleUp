import { ReactNode, useMemo, useState } from 'react';
import Modal from '../components/common/Modal/Modal';
import { getId } from '../utils/getId';
import { createPortal } from 'react-dom';
import BackDrop from '../components/common/Modal/BackDrop';

type ModalList = { id: string; component: ReactNode; show: boolean }[];

export default function useModal() {
  const [modalList, setModalList] = useState<ModalList>([]);

  const ModalComponent = useMemo(
    () =>
      function _Modal() {
        const showModalList = modalList
          .filter(({ show }) => show)
          .map(({ component }) => component);

        return showModalList.length > 0
          ? createPortal(
              <>
                {showModalList}
                <BackDrop isOpen={true} />
              </>,
              document.body,
            )
          : null;
      },
    [modalList],
  );

  const createModal = (
    content: ReactNode,
    options?: { onClose?: () => void; footer?: ReactNode },
  ) => {
    const id = `modal_${getId()}`;

    const _onClose = () => {
      setModalList((prev) =>
        prev.map((prevItem) =>
          id === prevItem.id ? { ...prevItem, show: false } : prevItem,
        ),
      );

      if (options?.onClose) options.onClose();
    };

    setModalList((prev) => [
      ...prev,
      {
        id,
        component: (
          <Modal key={id} onClose={_onClose} footer={options?.footer}>
            {content}
          </Modal>
        ),
        show: true,
      },
    ]);
  };

  return {
    Modal: ModalComponent,
    createModal,
  };
}
