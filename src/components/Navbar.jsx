import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useFetch from '../utils/use-fetch';
import '../styles/Navbar.css';

function Navbar({ colorScheme, children }) {
  const { data, error, loading } = useFetch(
    'https://fakestoreapi.com/products/categories',
  );

  // console.log(data);

  return (
    <nav style={{ backgroundColor: colorScheme.navBg }}>
      <div className="container">
        <Link to="/">
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
    cartModalBg: PropTypes.string,
    navBg: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.element,
};

export default Navbar;
