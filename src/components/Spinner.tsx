import { clamp } from '../utils/util';
import '../styles/Spinner.css';

interface SpinnerProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  name?: string;
  min?: number | null;
  max?: number | null;
}

// React component for spinner
// (i.e. `input[number]` w/ increment and decrement buttons)
export default function Spinner({
  value,
  setValue,
  name = 'number',
  min = null,
  max = null,
}: SpinnerProps) {
  // decrement value of spinner
  function decrement() {
    setValue((n) => {
      if (min === null) return n - 1;
      const value = Number(n);
      return value <= min ? min : value - 1;
    });
  }

  // increment value of spinner
  function increment() {
    setValue((n) => {
      if (max === null) return n + 1;
      const value = Number(n);
      return value >= max ? max : value + 1;
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (min && max) setValue(clamp(Number(e.target.value), min, max));
    else if (min) setValue(Math.max(Number(e.target.value), min));
    else if (max) setValue(Math.min(Number(e.target.value), max));
    else setValue(Number(e.target.value));
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
        min={String(min)}
        max={String(max)}
        value={value}
        onChange={handleChange}
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
