import { ReactNode, useMemo, useState } from 'react';
import Modal from '../components/common/Modal/Modal';
import { getId } from '../utils/getId';
import { createPortal } from 'react-dom';
import BackDrop from '../components/common/Modal/BackDrop';

interface ModalInfo {
  id: string;
  component: ReactNode;
  show: boolean;
}

type ModalList = ModalInfo[];

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

  const hideModal = (id: ModalInfo['id']) => {
    setModalList((prev) =>
      prev.map((prevItem) =>
        id === prevItem.id ? { ...prevItem, show: false } : prevItem,
      ),
    );
  };

  const createModal: CreateModal = (content, options) => {
    const id = `modal_${getId()}`;

    setModalList((prev) => [
      ...prev,
      {
        id,
        component: (
          <Modal key={id}>
            <Modal.CloseButton onClick={() => hideModal(id)} />
            <Modal.Content>{content}</Modal.Content>
            {options?.bottomButtons ? (
              <Modal.BottomButtons onClick={() => hideModal(id)}>
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
