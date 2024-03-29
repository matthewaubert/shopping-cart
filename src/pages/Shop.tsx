import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import AddToCart from '../components/AddToCart';
import Loader from '../components/Loader';
import useFetch from '../utils/use-fetch';
import { sortBy } from '../utils/util';
import { StoreItem } from '../types';
import '../styles/Shop.css';

// React component for Shop page
function Shop() {
  const [sortCriteria, setSortCriteria] = useState('');
  const { name } = useParams(); // name of url endpoint
  const fetchEndpoint =
    !name || name === 'all-products'
      ? ''
      : `/category/${name.replace('-', '%20')}`;
      
  const { data, error, loading } = useFetch<StoreItem[]>(
    `https://fakestoreapi.com/products${fetchEndpoint}`,
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
      {loading && <Loader />}
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
