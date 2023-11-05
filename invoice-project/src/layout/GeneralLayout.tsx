import { ReactNode } from 'react';
import Header from '../components/header/organisms/Header';
import { Global } from '@emotion/react';
import { globalStyle } from '../styles/globalStyle.style';

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Global styles={globalStyle} />
      <Header />
      {children}
    </>
  );
}
