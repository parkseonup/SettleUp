import { useEffect } from 'react';

// NOTE: body의 스크롤을 방지하는 기능
// TODO: 얼마나 호출되는지 확인해보기 (의도한 대로 호출되는지, 너무 자주 렌더링되진 않는지)
export default function useBlockingScroll(state: boolean) {
  useEffect(() => {
    document.body.style.overflow = state ? 'hidden' : 'visible';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [state]);
}
