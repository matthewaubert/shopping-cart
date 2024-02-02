import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddToCart from '../src/components/AddToCart';
import { data } from './example-data';

// mock useState
let cart = [];
function setCart(newCart) {
  cart = newCart;
}

// mock useOutletContext
vi.mock('react-router-dom', () => ({
  useOutletContext: () => [cart, setCart],
}));

// reset cart after each test
afterEach(() => setCart([]));

describe('Display', () => {
  it('initially renders "Add to Cart" button', () => {
    render(<AddToCart data={data} />);
    expect(screen.getByRole('button').textContent).toMatch(/add to cart/i);
  });

  it('displays a spinner and submit button when clicked', async () => {
    const user = userEvent.setup();
    render(<AddToCart data={data} />);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('informs user when items have been added to cart', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<AddToCart data={data} />);
    expect(screen.queryByText(/[0-9]+ in\scart/i)).toBeNull();

    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    await user.click(screen.getByRole('button', { name: /submit/i }));

    rerender(<AddToCart data={data} />);
    expect(screen.getByText(`1 in cart`)).toBeInTheDocument();
  });
});

describe('Managing Cart', () => {
  it('successfully adds an item to the cart', async () => {
    const user = userEvent.setup();
    render(<AddToCart data={data} />);
    expect(cart.length).toEqual(0);

    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(cart.length).toEqual(0);

    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(cart.length).toEqual(1);
  });

  it('adds the correct information to the cart', async () => {
    const user = userEvent.setup();
    render(<AddToCart data={data} />);
    expect(cart.length).toEqual(0);

    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(cart[0]).toEqual({
      ...data,
      quantity: 1,
    });
  });

  it('changes qty on same item if submitted twice', async () => {
    const user = userEvent.setup();
    render(<AddToCart data={data} />);
    expect(cart.length).toEqual(0);

    async function addOneToCart() {
      await user.click(screen.getByRole('button', { name: /increment/i }));
      await user.click(screen.getByRole('button', { name: /submit/i }));
    }

    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    await addOneToCart();
    expect(cart[0]).toEqual({
      ...data,
      quantity: 2,
    });

    await addOneToCart();
    expect(cart[0]).toEqual({
      ...data,
      quantity: 3,
    });
  });

  it('removes item when qty reduced to 0', async () => {
    const user = userEvent.setup();
    render(<AddToCart data={data} />);
    expect(cart.length).toEqual(0);

    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(cart.length).toEqual(1);

    await user.click(screen.getByRole('button', { name: /decrement/i }));
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(cart.length).toEqual(0);
  });

  it('removes item when "Remove" button is clicked', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<AddToCart data={data} />);
    expect(cart.length).toEqual(0);

    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(cart.length).toEqual(1);

    rerender(<AddToCart data={data} />);
    await user.click(screen.getByRole('button', { name: /remove/i }));
    expect(cart.length).toEqual(0);
  });
});

// it.skip('', async () => {});
