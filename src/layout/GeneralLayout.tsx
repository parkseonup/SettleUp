import { ReactNode } from 'react';
import { Global } from '@emotion/react';
import { globalStyle } from '../styles/globalStyle';
import GlobalHeader from '../components/common/organisms/GlobalHeader';

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Global styles={globalStyle} />
      <GlobalHeader />
      {children}
    </>
  );
}
