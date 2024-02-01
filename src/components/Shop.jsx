import Card from './Card';
import AddToCart from './AddToCart';
import useFetch from '../utils/use-fetch';
import '../styles/Shop.css';

// React component for Shop page
function Shop() {
  const { data, error, loading } = useFetch(
    'https://fakestoreapi.com/products',
  );

  // console.log('data:', data, 'error:', error, 'loading:', loading);
  console.log(data);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {data && (
        <div className="products">
          {data.map((item) => (
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
