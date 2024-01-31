import { useState } from 'react';
import PropTypes from 'prop-types';
import { clamp } from '../utils/util';
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
      <Spinner value={qty} setValue={setQty} min={0} max={99} />
      {!submitted ? <button>Submit</button> : <button>In Cart &#x2714;</button>}
    </form>
  );
}

AddToCart.propTypes = {
  data: PropTypes.object,
};

function Spinner({ value, setValue, min, max }) {
  // decrement value of spinner
  function decrement() {
    setValue((n) => {
      const qty = Number(n);
      return qty <= min ? min : qty - 1;
    });
  }

  // increment value of spinner
  function increment() {
    setValue((n) => {
      const qty = Number(n);
      return qty >= max ? max : qty + 1;
    });
  }

  return (
    <div className="spinner">
      <button type="button" className="dec" onClick={decrement}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>decrement</title>
          <path d="M20 14H4V10H20" />
        </svg>
      </button>
      <label>
        <input
          type="number"
          name="quantity"
          min="0"
          max="99"
          value={value}
          onChange={(e) => setValue(clamp(e.target.value, min, max))}
        />
      </label>
      <button type="button" className="inc" onClick={increment}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>increment</title>
          <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
        </svg>
      </button>
    </div>
  );
}

Spinner.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default AddToCart;
