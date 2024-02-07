import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorPage from '../src/ErrorPage';

it('renders app logo', () => {
  render(<ErrorPage />, { wrapper: BrowserRouter });
  expect(
    screen.getByRole('heading', { name: /shopping app/i }),
  ).toBeInTheDocument();
});

it("informs user they've reached an incorrect route", () => {
  render(<ErrorPage />, { wrapper: BrowserRouter });
  expect(screen.getByRole('heading', { name: /page/i })).toBeInTheDocument();
});

it('provides user with link back to homepage', () => {
  render(<ErrorPage />, { wrapper: BrowserRouter });
  screen
    .getAllByRole('link')
    .forEach((link) => expect(link).toHaveAttribute('href', '/'));
});
