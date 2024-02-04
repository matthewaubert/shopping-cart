import App from './App';
import ErrorPage from './ErrorPage';
import Home from './components/Home';
import Shop from './components/Shop';

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
