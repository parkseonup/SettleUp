import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NewInvoice from './pages/NewInvoice';
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
    element: <NewInvoice />,
    withAuth: false,
  },
  {
    path: '/',
    label: '정산 목록',
    element: <NewInvoice />,
    withAuth: false,
  },
  {
    path: '/login',
    label: '로그인',
    element: <NewInvoice />,
    withAuth: true,
    isLogged: false,
    aboutUser: true,
  },
  {
    path: '/join',
    label: '회원가입',
    element: <NewInvoice />,
    withAuth: true,
    isLogged: false,
    aboutUser: true,
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
