import { Dispatch, HTMLAttributes, useEffect, useRef } from 'react';
import Modal from '../atoms/Modal';
import getChildComponent from '../../../utils/getChildComponent';
import Trigger from '../atoms/Trigger';
import { SetStateAction } from 'jotai';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<Props['isOpen']>>;
}

export default function Dropdown({ children, isOpen, setIsOpen }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  const trigger = getChildComponent(children, Trigger);
  const modal = getChildComponent(children, Modal);

  const handleClickOutside = (e: Event) => {
    e.stopPropagation();
    if (modalRef.current && !modalRef.current.contains(e.target as HTMLElement) && isOpen === true) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <div
      ref={modalRef}
      css={{
        position: 'relative',
      }}
    >
      {trigger}

      <div
        css={{
          display: isOpen ? 'block' : 'none',
        }}
      >
        {modal}
      </div>
    </div>
  );
}

Dropdown.Trigger = Trigger;
Dropdown.Modal = Modal;
