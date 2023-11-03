import { RouterProvider } from 'react-router-dom';
import Header from './components/header/Header';
import { routers } from './router';

export default function App() {
  return (
    <>
      <Header />
      <RouterProvider router={routers} />
    </>
  );
}
