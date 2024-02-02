import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ children }) {
  return (
    <nav>
      <Link to="/">
        <h1>shopping cart</h1>
      </Link>
      <Link to="/shop">Shop</Link>
      {children}
    </nav>
  );
}

Navbar.propTypes = {
  children: PropTypes.element,
};

export default Navbar;
