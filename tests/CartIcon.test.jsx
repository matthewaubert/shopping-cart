import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartIcon from '../src/components/CartIcon';
import { cart as exampleCart } from './example-data';
import { calcCartTotal, calcQtyInCart, formatPrice } from '../src/utils/util';

// mock useState
let cart = [];
function setCart(newCart) {
  cart = newCart;
}

// reset cart after each test
afterEach(() => setCart([]));

describe('Cart Icon', () => {
  it('renders a shopping cart button', () => {
    render(<CartIcon cart={[]} setCart={setCart} />);
    const cartIcon = screen.getByTitle(/shopping cart/i);
    expect(screen.getByRole('button')).toContainElement(cartIcon);
  });

  it('does not have a number badge if cart is empty', () => {
    render(<CartIcon cart={[]} setCart={setCart} />);
    expect(screen.queryByText(/[0-9]+/)).toBeNull();
  });

  it('has an accurate number badge if cart has items', () => {
    render(<CartIcon cart={exampleCart} setCart={setCart} />);
    expect(Number(screen.queryByText(/[0-9]+/).textContent)).toEqual(
      calcQtyInCart(exampleCart),
    );
  });

  it('does not display modal before click', () => {
    render(<CartIcon cart={exampleCart} setCart={setCart} />);
    expect(screen.queryByRole('table', /items in your cart/i)).toBeNull();
  });

  it('displays modal on click', async () => {
    const user = userEvent.setup();
    render(<CartIcon cart={exampleCart} setCart={setCart} />);

    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(screen.getByTestId('cart-modal')).toBeInTheDocument();
  });
});

describe('Cart Modal', () => {
  it('informs user when there are no items in the cart', async () => {
    const user = userEvent.setup();
    render(<CartIcon cart={[]} setCart={setCart} />);

    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(screen.getByText(/no items in your cart/i)).toBeInTheDocument();
  });

  it('shows all items added to cart', async () => {
    const user = userEvent.setup();
    render(<CartIcon cart={exampleCart} setCart={setCart} />);

    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    exampleCart.forEach((item) => {
      expect(
        screen.getByRole('rowheader', { name: item.title.trim() }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('cell', { name: item.quantity }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('cell', { name: formatPrice(item.price) }),
      ).toBeInTheDocument();
    });
  });

  it('shows total cost for each item', async () => {
    const user = userEvent.setup();
    render(<CartIcon cart={exampleCart} setCart={setCart} />);

    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    exampleCart.forEach((item) => {
      expect(
        screen.getByRole('cell', {
          name: formatPrice(item.quantity * item.price),
        }),
      ).toBeInTheDocument();
    });
  });

  it('shows grand total cost for all items added to cart', async () => {
    const user = userEvent.setup();
    render(<CartIcon cart={exampleCart} setCart={setCart} />);

    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(
      screen.getByRole('cell', {
        name: formatPrice(calcCartTotal(exampleCart)),
      }),
    ).toBeInTheDocument();
  });

  it('removes item when "Remove" button is clicked', async () => {
    const user = userEvent.setup();
    setCart(exampleCart);
    const { rerender } = render(<CartIcon cart={cart} setCart={setCart} />);
    expect(cart.length).toEqual(exampleCart.length);

    // renders a rowheader for each product in cart (plus 1 for footer)
    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(screen.getAllByRole('rowheader').length - 1).toEqual(cart.length);

    for (let i = 0; i < exampleCart.length; i++) {
      const remove = screen.getAllByRole('button', { name: /remove/i })[0];
      await user.click(remove);
      rerender(<CartIcon cart={cart} setCart={setCart} />);
      i < exampleCart.length - 1
        ? expect(screen.queryAllByRole('rowheader').length - 1).toEqual(
            cart.length,
          )
        : expect(screen.queryAllByRole('rowheader').length).toEqual(
            cart.length,
          );
    }

    expect(screen.getByText(/no items in your cart/i)).toBeInTheDocument();
  });

  it('has a `checkout` button if items are in the cart', async () => {
    const user = userEvent.setup();
    render(<CartIcon cart={exampleCart} setCart={setCart} />);

    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(
      screen.getByRole('button', { name: /checkout/i }),
    ).toBeInTheDocument();
  });

  it('`checkout` button Rickrolls the user 🤣', async () => {
    const user = userEvent.setup();
    render(<CartIcon cart={exampleCart} setCart={setCart} />);

    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(screen.getByRole('link', { name: /checkout/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
    );
  });
});

// it.skip('', () => {});

// expect(
//   screen.getByRole('table', /items in your cart/i),
// ).toBeInTheDocument();
