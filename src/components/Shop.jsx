import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import AddToCart from './AddToCart';
import useFetch from '../utils/use-fetch';
import { sortBy } from '../utils/util';
import '../styles/Shop.css';

// React component for Shop page
function Shop() {
  const [sortCriteria, setSortCriteria] = useState('');
  const { name } = useParams(); // name of url endpoint
  const fetchEndpoint =
    name === 'all-products' ? '' : `/category/${name.replace('-', '%20')}`;
  const { data, error, loading } = useFetch(
    `https://fakestoreapi.com/products${fetchEndpoint}`,
  );

  // console.log('data:', data, 'error:', error, 'loading:', loading);
  console.log(data);

  const loader = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="loader"
    >
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
    </svg>
  );

  return (
    <>
      <label className="sort-by">
        Sort by:
        <select
          name="sort-by"
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="">Recommended</option>
          <option value="title">Product Name</option>
          <option value="price">Price Low to High</option>
          <option value="rating">Customer Rating</option>
        </select>
      </label>
      {error && <p className="error">{error}</p>}
      {loading && loader}
      {data && (
        <div className="products">
          {sortBy(data, sortCriteria).map((item) => (
            <Card key={item.id} data={item}>
              <AddToCart data={item} />
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default Shop;
