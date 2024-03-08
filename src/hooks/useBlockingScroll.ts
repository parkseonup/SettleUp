import { useEffect } from 'react';

export default function useBlockingScroll(state: boolean) {
  useEffect(() => {
    document.body.style.overflow = state ? 'hidden' : 'visible';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [state]);
}
