import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar';

// mock useFetch
vi.mock('../src/utils/use-fetch', () => ({
  default: () => ({
    data: ['electronics', 'jewelry', "men's clothing", "women's clothing"],
    error: null,
    loading: false,
  }),
}));

it('renders a heading', () => {
  render(<Navbar />, { wrapper: BrowserRouter });
  expect(screen.getByRole('heading')).toBeInTheDocument();
});

it('has links to home page, all products, and each product category', async () => {
  const hrefs = [
    '/',
    '/shop/all-products',
    '/shop/electronics',
    '/shop/jewelry',
    "/shop/men's-clothing",
    "/shop/women's-clothing",
  ];

  render(<Navbar />, { wrapper: BrowserRouter });

  const links = screen.getAllByRole('link');
  expect(links.length).toEqual(hrefs.length);
  links.forEach((link, i) => expect(link).toHaveAttribute('href', hrefs[i]));
});

it('renders passed-in children elements', () => {
  render(
    <Navbar>
      <div>child element</div>
    </Navbar>,
    { wrapper: BrowserRouter },
  );

  expect(screen.getByText('child element')).toBeInTheDocument();
});
