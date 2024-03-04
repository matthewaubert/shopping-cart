import Rating from './Rating';
import { formatPrice } from '../utils/util';
import { CartItem } from '../types';
import '../styles/Card.css';

interface CardProps {
  data: CartItem;
  children?: JSX.Element;
}

// React component to display each product
export default function Card({ data, children }: CardProps) {
  return (
    <div className="card">
      <img src={data.image} alt=""></img>
      <h2 className="title" title={data.title}>
        {data.title}
      </h2>
      <div className="price">{formatPrice(data.price)}</div>
      <Rating rate={data.rating.rate} count={data.rating.count} />
      {children}
    </div>
  );
}
