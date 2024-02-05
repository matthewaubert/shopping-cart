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
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
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
