import { useState } from 'react';
import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import Spinner from './Spinner';
import { changeCartItem, findItemQty } from '../utils/util';
import '../styles/AddToCart.css';

function AddToCart({ data }) {
  const [cart, setCart] = useOutletContext();
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const qtyInCart = findItemQty(data.id, cart);
  const [qty, setQty] = useState(qtyInCart > 0 ? qtyInCart : 1);

  function onFormSubmit(e) {
    e.preventDefault();
    // console.log(e.target.elements.quantity.value);
    setHasBeenClicked(() => qty > 0);
    setCart(changeCartItem({ ...data, quantity: qty }, cart));
  }

  function removeFromCart() {
    setHasBeenClicked(false);
    setQty(0);
    setCart(changeCartItem({ ...data, quantity: 0 }, cart));
  }

  const qtyDisplay =
    qtyInCart > 0 ? (
      <div className="qty-display">
        <span>{qtyInCart} in cart</span>
        <span>&#x2022;</span>
        <button className="remove" onClick={removeFromCart}>
          Remove
        </button>
      </div>
    ) : null;

  return (
    <>
      {!hasBeenClicked ? (
        <button className="atc-form" onClick={() => setHasBeenClicked(true)}>Add to Cart</button>
      ) : (
        <form className="atc-form" onSubmit={onFormSubmit}>
          <Spinner
            value={qty}
            setValue={setQty}
            name={'quantity'}
            min={0}
            max={99}
          />
          <button>Submit</button>
        </form>
      )}
      {qtyDisplay}
    </>
  );
}

AddToCart.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      count: PropTypes.number.isRequired,
      rate: PropTypes.number.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddToCart;
