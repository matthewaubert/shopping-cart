import { useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import '../styles/AddToCart.css';

function AddToCart({ data }) {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [qty, setQty] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    console.log(e.target.elements.quantity.value);
  }

  return !hasBeenClicked ? (
    <button onClick={() => setHasBeenClicked(true)}>Add to Cart</button>
  ) : (
    <form className="add-to-cart" onSubmit={onSubmit}>
      <Spinner
        value={qty}
        setValue={setQty}
        name={'quantity'}
        min={0}
        max={99}
      />
      {!submitted ? <button>Submit</button> : <button>In Cart &#x2714;</button>}
    </form>
  );
}

AddToCart.propTypes = {
  data: PropTypes.object,
};

export default AddToCart;
