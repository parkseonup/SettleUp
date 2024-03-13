import { ReactNode, Suspense } from 'react';
import { Global } from '@emotion/react';
import { globalStyle } from '../styles/globalStyle';

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Global styles={globalStyle} />
      <Suspense fallback="페이지를 로딩 중입니다.">{children}</Suspense>
    </>
  );
}
