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
    </div>
  );
}

export default Card;
