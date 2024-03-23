import { ReactNode, useMemo, useState } from 'react';
import Modal from '../components/common/Modal/Modal';
import { getId } from '../utils/getId';
import { createPortal } from 'react-dom';
import BackDrop from '../components/common/Modal/BackDrop';

type ModalList = { id: string; component: ReactNode; show: boolean }[];

type CreateModal = (
  content: ReactNode,
  options?: { onClose?: () => void; bottomButtons?: ReactNode },
) => void;

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

  const createModal: CreateModal = (content, options) => {
    const id = `modal_${getId()}`;

    const hideModal = () => {
      setModalList((prev) =>
        prev.map((prevItem) =>
          id === prevItem.id ? { ...prevItem, show: false } : prevItem,
        ),
      );
    };

    setModalList((prev) => [
      ...prev,
      {
        id,
        component: (
          <Modal key={id}>
            <Modal.CloseButton onClick={hideModal} />
            <Modal.Content>{content}</Modal.Content>
            {options?.bottomButtons ? (
              <Modal.BottomButtons onClick={hideModal}>
                {options.bottomButtons}
              </Modal.BottomButtons>
            ) : null}
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
