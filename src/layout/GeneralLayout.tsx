import { ReactNode, Suspense } from 'react';
import { Global } from '@emotion/react';
import { globalStyle } from '../styles/globalStyle';

// NOTE: 기본 ui
// TODO: Outlet 컴포넌트를 사용하면 어떤지 고민해보기
export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Global styles={globalStyle} />
      <Suspense fallback="페이지를 로딩 중입니다.">{children}</Suspense>
    </>
  );
}
