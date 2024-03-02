import { ReactNode } from 'react';
import { Global } from '@emotion/react';
import { globalStyle } from '../styles/globalStyle';

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Global styles={globalStyle} />
      {children}
    </>
  );
}
