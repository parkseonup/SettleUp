import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NewInvoice from './pages/NewInvoice';

interface RouterData {
  path: string;
  label: string;
  element: ReactNode;
}

const routerData: RouterData[] = [
  {
    path: '/',
    label: '정산 만들기',
    element: <NewInvoice />,
  },
];

export const routers = createBrowserRouter(routerData.map(({ path, element }) => ({ path, element })));

export const navData = routerData.map(({ path, label }) => ({ path, label }));
