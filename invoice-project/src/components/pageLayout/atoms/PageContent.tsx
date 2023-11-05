import { ReactNode } from 'react';

export interface PageContentProps {
  children: ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
  return <div>{children}</div>;
}
