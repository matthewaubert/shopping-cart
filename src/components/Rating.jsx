import PropTypes from 'prop-types';
import { roundHalf } from '../utils/util';

// React component that displays given rating as x/5 stars and number of votes
function Rating({ rating }) {
  const accessibleRating = `Rated ${rating.rate} out of 5 stars`;
  const accessibleTotal = `${rating.count} total votes`;

  return (
    <div className="rating">
      <Stars rating={rating.rate} accessibleRating={accessibleRating} />
      <span title={accessibleTotal} aria-label={accessibleTotal}>
        ({rating.count})
      </span>
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.shape({
    count: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  }).isRequired,
};

function Stars({ rating, accessibleRating }) {
  const fullStar = (
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
  );
  const halfStar = (
    <path d="M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
  );
  const emptyStar = (
    <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
  );

  const starsArr = [];

  // round rating to nearest half integer
  const roundedRating = roundHalf(rating);
  // add numFullStars full stars to starsArr
  const numFullStars = Math.floor(roundedRating);
  for (let i = 0; i < numFullStars; i++) starsArr.push(fullStar);
  // if roundedRating % 1 > 0: add half star to starsArr
  if (roundedRating % 1 > 0) starsArr.push(halfStar);
  // while length of starsArr < 5, add empty stars
  while (starsArr.length < 5) starsArr.push(emptyStar);

  return (
    <div
      className="stars"
      title={accessibleRating}
      aria-label={accessibleRating}
    >
      {starsArr.map((star, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          {star}
        </svg>
      ))}
    </div>
  );
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
  accessibleRating: PropTypes.string.isRequired,
};

export default Rating;
