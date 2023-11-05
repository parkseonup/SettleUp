import { ReactNode } from 'react';
import GlobalHeader from '../components/globalHeader/organisms/GlobalHeader';
import { Global } from '@emotion/react';
import { globalStyle } from '../styles/globalStyle.style';

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Global styles={globalStyle} />
      <GlobalHeader />
      {children}
    </>
  );
}
