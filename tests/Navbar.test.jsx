import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar';

it('renders a heading', () => {
  render(<Navbar />, { wrapper: BrowserRouter });
  expect(screen.getByRole('heading')).toBeInTheDocument();
});

it('has links to the home page and shop page', () => {
  const hrefs = ['/', '/shop'];
  render(<Navbar />, { wrapper: BrowserRouter });
  screen
    .getAllByRole('link')
    .forEach((link, i) => expect(link).toHaveAttribute('href', hrefs[i]));
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
