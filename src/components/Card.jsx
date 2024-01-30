import PropTypes from 'prop-types';
import Rating from './Rating';
import { formatPrice } from '../utils/util';
import '../styles/Card.css';

function Card({ data }) {
  return (
    <div className="card">
      <img src={data.image} alt=""></img>
      <h3 className="title" title={data.title}>
        {data.title}
      </h3>
      <div className="price">{formatPrice(data.price)}</div>
      <Rating rating={data.rating} />
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.shape({
      count: PropTypes.number,
      rate: PropTypes.number,
    }),
    title: PropTypes.string,
  }),
};

export default Card;
