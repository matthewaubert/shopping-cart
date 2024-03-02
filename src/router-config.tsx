import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Shop from './pages/Shop';

const routerConfig = [
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
