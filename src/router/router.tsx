import { RouteObject, createBrowserRouter } from 'react-router-dom';
import GeneralLayout from '../layout/GeneralLayout';
import Create from '../pages/Create';
import Result from '../pages/Result';
import History from '../pages/History';
import HistoryDetail from '../pages/HistoryDetail';
import { historyDetailLoader } from './historyDetailLoader';
import ResultErrorBoundary from '../components/Result/ResultErrorBoundary';

type RouterBase = RouteObject & {
  label: string;
  showMenu: boolean;
};

const routerData: RouterBase[] = [
  {
    path: '/',
    label: '정산 만들기',
    showMenu: true,
    element: <Create />,
    children: [
      {
        path: 'create',
        element: <Create />,
        children: [
          {
            path: ':stepIndex',
            element: <Create />,
          },
        ],
      },
    ],
  },
  {
    path: '/result',
    label: '정산 결과',
    showMenu: false,
    element: <Result />,
    errorElement: (
      <GeneralLayout>
        <ResultErrorBoundary />
      </GeneralLayout>
    ),
  },
  {
    path: '/history',
    label: '정산 목록',
    showMenu: true,
    element: <History />,
  },
  {
    path: '/history/:id',
    label: '정산 내역',
    showMenu: false,
    element: <HistoryDetail />,
    loader: historyDetailLoader,
  },
];

// THINK: eslint 무시하는거 말고 다른 방법은 없을까?
export const router = createBrowserRouter(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  routerData.map(({ label, showMenu, ...router }) => ({
    ...router,
    element: <GeneralLayout>{router.element}</GeneralLayout>,
  })),
);

interface NavData {
  path: string;
  label: string;
  showMenu: true;
}

export const navData = routerData
  .filter((data): data is NavData => !!data.showMenu)
  .map(({ path, label }) => ({ path, label }));
