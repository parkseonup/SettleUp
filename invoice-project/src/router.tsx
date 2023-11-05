import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import New from './pages/New';
import GeneralLayout from './layout/GeneralLayout';

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
    path: '/',
    label: '정산 만들기',
    element: <New />,
    withAuth: false,
  },
];

export const router = createBrowserRouter(
  routerData.map((router) => ({ path: router.path, element: <GeneralLayout>{router.element}</GeneralLayout> })),
);

export const navData: NavData = routerData.map((router) => ({
  path: router.path,
  label: router.label,
  withAuth: router.withAuth,
  isLogged: 'isLogged' in router && router.isLogged,
  aboutUser: 'aboutUser' in router && router.aboutUser,
}));
