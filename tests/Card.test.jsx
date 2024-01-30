import { render, screen } from '@testing-library/react';
import Card from '../src/components/Card';
import { formatPrice, roundHalf } from '../src/utils/util';

const data = {
  category: "men's clothing",
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  id: 1,
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  price: 109.95,
  rating: {
    count: 120,
    rate: 3.6,
  },
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
};

it('has the correct image', () => {
  render(<Card data={data} />);
  expect(screen.getByRole('img')).toHaveAttribute('src', data.image);
});

it('has the correct product name', () => {
  render(<Card data={data} />);
  expect(screen.getByRole('heading').textContent).toMatch(data.title);
});

it('has the correct price', () => {
  render(<Card data={data} />);
  expect(screen.getByText(formatPrice(data.price))).toBeInTheDocument();
});

describe('Rating', () => {
  const accessRating = `Rated ${data.rating.rate} out of 5 stars`;
  const accessTotal = `${data.rating.count} total votes`;

  it('has the correct rating and total votes', () => {
    render(<Card data={data} />);
    expect(screen.getByTitle(accessRating)).toBeInTheDocument();
    expect(screen.getByTitle(accessTotal)).toBeInTheDocument();
  });

  it('renders the correct stars', () => {
    const fullStar =
      'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z';
    const halfStar =
      'M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z';
    const emptyStar =
      'M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z';
    const roundedRating = roundHalf(data.rating.rate);

    render(<Card data={data} />);
    const starsContainer = screen.getByTitle(accessRating);
    starsContainer.childNodes.forEach((star, i) => {
      const path =
        roundedRating - i >= 1
          ? fullStar
          : roundedRating - i > 0
            ? halfStar
            : emptyStar;

      expect(star.childNodes[0]).toHaveAttribute('d', path);
    });
  });
});
