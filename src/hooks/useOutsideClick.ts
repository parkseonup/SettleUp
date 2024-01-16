import { RefObject, useEffect } from 'react';

export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: Event) => void,
) {
  const handleClick = (e: Event) => {
    if (ref.current !== null && !ref.current.contains(e.target as Node)) handler(e);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [ref, handler]);
}
