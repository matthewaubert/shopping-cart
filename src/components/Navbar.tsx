import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import useFetch from '../utils/use-fetch';
import useMediaQuery from '../utils/use-media-query';
import { ColorSchemeObj } from '../types';
import '../styles/Navbar.css';

interface NavbarProps {
  colorScheme?: ColorSchemeObj;
  children?: JSX.Element;
}

export default function Navbar({ colorScheme, children }: NavbarProps) {
  // check if window matches media query
  const matchesMediaQuery = useMediaQuery('(max-width: 875px)');
  // fetch product categories from API
  const { data, error, loading } = useFetch<string[]>(
    'https://fakestoreapi.com/products/categories',
  );
  const navbarRef = useRef<HTMLElement>(null);

  // add shadow to navbar when user scrolls down
  useEffect(() => {
    function onScroll() {
      if (navbarRef.current)
        window.scrollY > 0
          ? navbarRef.current.classList.add('shadow')
          : navbarRef.current.classList.remove('shadow');
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <nav
      ref={navbarRef}
      style={colorScheme && { backgroundColor: colorScheme.navBg }}
    >
      <div className="container">
        {matchesMediaQuery && (
          <HamburgerMenu>
            <div
              className="product-links"
              style={colorScheme && { backgroundColor: colorScheme.modalBg }}
            >
              <ProductLinks data={data} error={error} loading={loading} />
            </div>
          </HamburgerMenu>
        )}
        <Link
          to="/"
          className="logo"
          style={
            colorScheme && {
              color: colorScheme.accent,
              textDecorationColor: colorScheme.accent,
            }
          }
        >
          <h1>shopping app</h1>
        </Link>
        {!matchesMediaQuery && (
          <div className="product-links">
            <ProductLinks data={data} error={error} loading={loading} />
          </div>
        )}
        {children}
      </div>
    </nav>
  );
}

interface ProductLinksProps {
  data: string[] | null;
  error: string | null;
  loading: boolean;
}

function ProductLinks({ data, error, loading }: ProductLinksProps) {
  return (
    <>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      {data && (
        <>
          <Link to="/shop/all-products">all products</Link>
          {data.map((category) => (
            <Link to={'shop/' + category.replace(' ', '-')} key={category}>
              {category}
            </Link>
          ))}
        </>
      )}
    </>
  );
}
