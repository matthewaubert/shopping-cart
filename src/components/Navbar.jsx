import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useFetch from '../utils/use-fetch';
import '../styles/Navbar.css';

function Navbar({ colorScheme, children }) {
  const { data, error, loading } = useFetch(
    'https://fakestoreapi.com/products/categories',
  );
  const navbarRef = useRef(null);

  // add shadow to navbar when user scrolls down
  useEffect(() => {
    function onScroll() {
      window.scrollY > 0
        ? navbarRef.current.classList.add('shadow')
        : navbarRef.current.classList.remove('shadow');
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  // console.log(data);

  return (
    <nav ref={navbarRef} style={{ backgroundColor: colorScheme.navBg }}>
      <div className="container">
        <Link
          to="/"
          className="logo"
          style={{
            color: colorScheme.accent,
            textDecorationColor: colorScheme.accent,
          }}
        >
          <h1>shopping app</h1>
        </Link>
        <div className="product-links">
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
        </div>
        {children}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  colorScheme: PropTypes.shape({
    accent: PropTypes.string.isRequired,
    navBg: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.element,
};

export default Navbar;
