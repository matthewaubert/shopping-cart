import PropTypes from 'prop-types';
import { clamp } from '../utils/util';
import '../styles/Spinner.css';

function Spinner({ value, setValue, name = 'number', min = null, max = null }) {
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
      <label htmlFor="spinner-input" className="visually-hidden">
        {name}
      </label>
      <input
        id="spinner-input"
        type="number"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(clamp(Number(e.target.value), min, max))}
      />
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
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default Spinner;
