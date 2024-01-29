import App from './App';
import ErrorPage from './ErrorPage';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';

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
        path: '/shop',
        element: <Shop />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
];

export default routerConfig;
