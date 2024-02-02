import { render, screen } from '@testing-library/react';
import CartIcon from '../src/components/CartIcon';
import { cart } from './example-data';
import { calcQtyInCart } from '../src/utils/util';

it('renders a shopping cart button', () => {
  render(<CartIcon cart={[]} />);
  const cartIcon = screen.getByTitle('shopping cart');
  expect(screen.getByRole('button')).toContainElement(cartIcon);
});

it('does not have a number badge if cart is empty', () => {
  render(<CartIcon cart={[]} />);
  expect(screen.queryByText(/[0-9]+/)).toBeNull();
});

it('has an accurate number badge if cart has items', () => {
  render(<CartIcon cart={cart} />);
  expect(Number(screen.queryByText(/[0-9]+/).textContent)).toEqual(
    calcQtyInCart(cart),
  );
});

// it.skip('', () => {});
