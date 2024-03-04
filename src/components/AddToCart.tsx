import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Spinner from './Spinner';
import { changeCartItem, findItemQty } from '../utils/util';
import { CartItem, CartOutletContext } from '../types';
import '../styles/AddToCart.css';

// React component for 'add to cart' functionality
export default function AddToCart({ data }: { data: CartItem }) {
  const [cart, setCart] = useOutletContext<CartOutletContext>();
  // bool whether to display 'Add to Cart' button or spinner/submit
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const qtyInCart = findItemQty(data.id, cart);
  const [qty, setQty] = useState(qtyInCart > 0 ? qtyInCart : 1);

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHasBeenClicked(() => qty > 0);
    setCart(changeCartItem({ ...data, quantity: qty }, cart));
  }

  function removeFromCart() {
    setHasBeenClicked(false);
    setQty(0);
    setCart(changeCartItem({ ...data, quantity: 0 }, cart));
  }

  // qty display below form when user adds item to cart
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
        <button
          className="atc-form btn"
          onClick={() => setHasBeenClicked(true)}
        >
          Add to Cart
        </button>
      ) : (
        <form className="atc-form" onSubmit={onFormSubmit}>
          <Spinner
            value={qty}
            setValue={setQty}
            name="quantity"
            min={0}
            max={99}
          />
          <button className="btn">Submit</button>
        </form>
      )}
      {qtyDisplay}
    </>
  );
}
