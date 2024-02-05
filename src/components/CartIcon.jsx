import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  calcCartTotal,
  changeCartItem,
  calcQtyInCart,
  formatPrice,
  sortBy,
} from '../utils/util';
import '../styles/CartIcon.css';

function CartIcon({ cart, setCart, colorScheme }) {
  const [displayModal, setDisplayModal] = useState(false);

  const itemsInCart = calcQtyInCart(cart);
  const onClick = () => setDisplayModal(() => !displayModal);

  return (
    <>
      <button className="cart-btn" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>shopping cart</title>
          <path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
        </svg>
        {cart.length > 0 && <span>{itemsInCart}</span>}
      </button>
      {displayModal && (
        <CartModal
          cart={cart}
          setCart={setCart}
          colorScheme={colorScheme}
          setDisplayModal={setDisplayModal}
        />
      )}
    </>
  );
}

CartIcon.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  colorScheme: PropTypes.shape({
    cartModalBg: PropTypes.string.isRequired,
    navBg: PropTypes.string,
  }).isRequired,
};

// return a popup modal with a line for each item in cart
function CartModal({ cart, setCart, colorScheme, setDisplayModal }) {
  function removeFromCart(item) {
    setCart(changeCartItem({ ...item, quantity: 0 }, cart));
  }
  const closeModal = () => setDisplayModal(() => false);

  return (
    <>
      <div className="modal-bg" onClick={closeModal}></div>
      <div
        className="cart-modal"
        data-testid="cart-modal"
        style={{ backgroundColor: colorScheme.cartModalBg }}
      >
        {cart.length > 0 ? (
          <>
            <table>
              <caption>Items In Your Cart: </caption>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {sortBy(cart, 'title').map((item) => (
                  <tr key={item.id}>
                    <th scope="row" title={item.title}>
                      {item.title}
                    </th>
                    <td>{item.quantity}</td>
                    <td>{formatPrice(item.price)}</td>
                    <td>{formatPrice(item.quantity * item.price)}</td>
                    <td>
                      <button
                        className="remove"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colSpan="3">
                    Shopping Cart Total
                  </th>
                  <td>{formatPrice(calcCartTotal(cart))}</td>
                </tr>
              </tfoot>
            </table>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
              target="_blank"
              rel="noreferrer"
              className="checkout btn"
            >
              Checkout
            </a>
          </>
        ) : (
          <div>You have no items in your cart!</div>
        )}
      </div>
    </>
  );
}

CartModal.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  colorScheme: PropTypes.shape({
    cartModalBg: PropTypes.string.isRequired,
    navBg: PropTypes.string,
  }).isRequired,
  setDisplayModal: PropTypes.func.isRequired,
};

export default CartIcon;
