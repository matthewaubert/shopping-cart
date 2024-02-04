import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useFetch from '../utils/use-fetch';
import '../styles/Navbar.css';

function Navbar({ children }) {
  const { data, error, loading } = useFetch(
    'https://fakestoreapi.com/products/categories',
  );

  console.log(data);

  return (
    <nav>
      <Link to="/">
        <h1>shopping cart</h1>
      </Link>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {data && (
        <div className="product-links">
          <>
            <Link to="/shop/all-products">all products</Link>
            {data.map((category) => (
              <Link to={'shop/' + category.replace(' ', '-')} key={category}>
                {category}
              </Link>
            ))}
          </>
        </div>
      )}
      {children}
    </nav>
  );
}

Navbar.propTypes = {
  children: PropTypes.element,
};

export default Navbar;
