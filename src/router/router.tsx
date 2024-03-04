import { Link, RouteObject, createBrowserRouter } from 'react-router-dom';
import GeneralLayout from '../layout/GeneralLayout';
import Create from '../pages/Create';
import Result from '../pages/Result';
import History from '../pages/History';
import HistoryItem from '../pages/HistoryItem';
import { historyItemLoader } from './historyItemLoader';

type RouterBase = RouteObject & {
  label?: string;
};

const routerData: RouterBase[] = [
  {
    path: '/',
    label: '정산 만들기',
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
    element: <Result />,
    errorElement: (
      <Link to="/create">생성된 정산 내역이 없습니다. 정산 만들기부터 진행해주세요.</Link>
    ),
  },
  {
    path: '/history',
    label: '정산 목록',
    element: <History />,
  },
  {
    path: '/history/:id',
    element: <HistoryItem />,
    loader: historyItemLoader,
  },
];

export const router = createBrowserRouter(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  routerData.map(({ label, ...router }) => ({
    ...router,
    element: <GeneralLayout>{router.element}</GeneralLayout>,
  })),
);

export const navData = routerData
  .filter(({ label }) => label)
  .map(({ path, label }) => ({ path, label }));
