import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Shop from './pages/Shop';

interface RouteObject {
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element;
  children: {
    path: string;
    element: JSX.Element;
  }[];
}

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop/:name',
        element: <Shop />,
      },
    ],
  },
];

export default routerConfig;
