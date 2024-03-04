import { roundHalf } from '../utils/util';

interface RatingProps {
  rate: number;
  count: number;
}

// React component that displays given X/5 rating as stars and count of votes
export default function Rating({ rate, count }: RatingProps) {
  const accessibleRating = `Rated ${rate} out of 5 stars`;
  const accessibleTotal = `${count} total votes`;

  return (
    <div className="rating">
      <Stars rate={rate} accessibleRating={accessibleRating} />
      <span title={accessibleTotal} aria-label={accessibleTotal}>
        ({count})
      </span>
    </div>
  );
}

const fullStar = (
  <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
);
const halfStar = (
  <path d="M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
);
const emptyStar = (
  <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
);

interface StarsProps {
  rate: number;
  accessibleRating: string;
}

function Stars({ rate, accessibleRating }: StarsProps) {
  const starsArr: JSX.Element[] = [];

  // round rating to nearest half integer
  const roundedRating = roundHalf(rate);
  // add numFullStars full stars to starsArr
  const numFullStars = Math.floor(roundedRating);
  for (let i = 0; i < numFullStars; i++) starsArr.push(fullStar);
  // if roundedRating % 1 > 0: add half star to starsArr
  if (roundedRating % 1 > 0) starsArr.push(halfStar);
  // while length of starsArr < 5, add empty stars
  while (starsArr.length < 5) starsArr.push(emptyStar);

  return (
    <span
      className="stars"
      title={accessibleRating}
      role="img"
      aria-label={accessibleRating}
    >
      {starsArr.map((star, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          {star}
        </svg>
      ))}
    </span>
  );
}
