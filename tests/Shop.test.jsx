import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from '../src/components/Shop';
import { data as exampleData } from './example-data';

// mock useParams
vi.mock('react-router-dom', () => ({
  useParams: () => ({ name: 'all-products' }),
}));

// mock useFetch
const data = [
  { ...exampleData, id: 1 },
  { ...exampleData, id: 2 },
  { ...exampleData, id: 3 },
];
vi.mock('../src/utils/use-fetch', () => ({
  default: () => ({
    data,
    error: null,
    loading: false,
  }),
}));

vi.mock('../src/components/AddToCart', () => ({
  default: () => <button>Add to cart</button>,
}));

it('renders the appropriate number of cards', () => {
  render(<Shop />);
  expect(screen.getAllByRole('heading').length).toEqual(data.length);
});

it('renders an element with options for sorting', () => {
  render(<Shop />);
  expect(screen.getByRole('combobox')).toBeInTheDocument();
  expect(screen.getAllByRole('option').length).toBeGreaterThan(1);
});
