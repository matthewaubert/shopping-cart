import { useState } from 'react';
import {
  calcCartTotal,
  changeCartItem,
  calcQtyInCart,
  formatPrice,
  sortBy,
} from '../utils/util';
import { CartItem, ColorSchemeObj, SetCartFn } from '../types';
import '../styles/CartIcon.css';

interface CartIconProps {
  cart: CartItem[];
  setCart: SetCartFn;
  colorScheme?: ColorSchemeObj;
}

// React component for cart icon nav element
export default function CartIcon({
  cart,
  setCart,
  colorScheme,
}: CartIconProps) {
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
        {cart.length > 0 && (
          <span style={colorScheme && { backgroundColor: colorScheme.accent }}>
            {itemsInCart}
          </span>
        )}
      </button>
      {displayModal && (
        <CartModal
          cart={cart}
          setCart={setCart}
          colorScheme={colorScheme && colorScheme}
          setDisplayModal={setDisplayModal}
        />
      )}
    </>
  );
}

interface CartModalProps {
  cart: CartItem[];
  setCart: SetCartFn;
  colorScheme?: ColorSchemeObj;
  setDisplayModal: (arg: boolean | (() => boolean)) => void;
}

// React component for a popup modal with a line for each item in cart
function CartModal({
  cart,
  setCart,
  colorScheme,
  setDisplayModal,
}: CartModalProps) {
  function removeFromCart(item: CartItem) {
    setCart(changeCartItem({ ...item, quantity: 0 }, cart));
  }
  const closeModal = () => setDisplayModal(() => false);

  return (
    <>
      <div className="modal-bg" onClick={closeModal}></div>
      <div
        className="cart-modal modal"
        data-testid="cart-modal"
        style={colorScheme && { backgroundColor: colorScheme.modalBg }}
      >
        {cart.length > 0 ? (
          <>
            <div className="table">
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
                  {(sortBy(cart, 'title') as CartItem[]).map((item: CartItem) => (
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
                          style={colorScheme && { color: colorScheme.accent }}
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
                    <th scope="row" colSpan={3}>
                      Shopping Cart Total
                    </th>
                    <td>{formatPrice(calcCartTotal(cart))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
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
          <div>You have no items in your cart.</div>
        )}
      </div>
    </>
  );
}
