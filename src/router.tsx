import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import GeneralLayout from './layout/GeneralLayout';
import Create from './pages/Create';

interface RouterBase {
  path: string;
  label: string;
  element: ReactNode;
  withAuth: boolean;
}

interface UserRouterData extends RouterBase {
  withAuth: true;
  isLogged: boolean;
  aboutUser: boolean;
}

type RouterData = RouterBase | UserRouterData;

export type NavData = Omit<RouterBase & Omit<UserRouterData, 'withAuth'>, 'element'>[];

const routerData: RouterData[] = [
  {
    path: '/create/:index',
    label: '정산 만들기',
    element: <Create />,
    withAuth: false,
  },
];

export const router = createBrowserRouter(
  routerData.map((router) => ({
    path: router.path,
    element: <GeneralLayout>{router.element}</GeneralLayout>,
  })),
);

export const navData: NavData = routerData.map((router) => ({
  path: router.path,
  label: router.label,
  withAuth: router.withAuth,
  isLogged: 'isLogged' in router && router.isLogged,
  aboutUser: 'aboutUser' in router && router.aboutUser,
}));
