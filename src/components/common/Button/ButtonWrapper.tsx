import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

// NOTE: buttonWrapper ui
// TODO: button이랑 폴더 엮기
export default function ButtonWrapper({ children }: Props) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '32px',
      }}
    >
      {children}
    </div>
  );
}
