import PropTypes from 'prop-types';
import Rating from './Rating';
import { formatPrice } from '../utils/util';
import '../styles/Card.css';

function Card({ data, children }) {
  return (
    <div className="card">
      <img src={data.image} alt=""></img>
      <h3 className="title" title={data.title}>
        {data.title}
      </h3>
      <div className="price">{formatPrice(data.price)}</div>
      <Rating rating={data.rating} />
      {children}
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      count: PropTypes.number.isRequired,
      rate: PropTypes.number.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.element,
};

export default Card;
