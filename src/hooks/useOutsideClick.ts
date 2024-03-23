import { RefObject, useEffect } from 'react';

// NOTE: 외부 클릭시 닫힘 기능
// TODO: 외부에 focus될 때도 닫혀야 하는거 아닌지 고민해보기 (이미 개별로 만들어져있나?)
// FIXME: useOutsideClick를 호출한 부분 외 다른 곳에서 혼용되어 호출됨... 해결하기. ex) 메뉴와 모달에서 useOutsideClick을 사용하고 있는데, 모달을 여는 버튼을 클릭했는데 메뉴의 useOutsideClick이 호출되어 모달이 열렸다가 바로 닫힘. 상태를 공유함...
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
