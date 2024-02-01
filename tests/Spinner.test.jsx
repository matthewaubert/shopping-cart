import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import Spinner from '../src/components/Spinner';
import userEvent from '@testing-library/user-event';

const attributes = {
  value: 1,
  name: 'quantity',
  min: 0,
  max: 99,
};

function MockSpinnerParent() {
  const [value, setValue] = useState(attributes.value);

  return (
    <Spinner
      value={value}
      setValue={setValue}
      name={attributes.name}
      min={attributes.min}
      max={attributes.max}
    />
  );
}

describe('input element', () => {
  it('has the correct starting value', () => {
    render(<MockSpinnerParent />);

    expect(screen.getByRole('spinbutton')).toHaveValue(attributes.value);
  });

  it('has the correct name', () => {
    render(<MockSpinnerParent />);

    expect(screen.getByRole('spinbutton')).toHaveAttribute(
      'name',
      attributes.name,
    );
  });

  it('has the correct min value', () => {
    render(<MockSpinnerParent />);

    expect(screen.getByRole('spinbutton')).toHaveAttribute(
      'min',
      attributes.min.toString(),
    );
  });

  it('has the correct max value', () => {
    render(<MockSpinnerParent />);

    expect(screen.getByRole('spinbutton')).toHaveAttribute(
      'max',
      attributes.max.toString(),
    );
  });
});

describe('value updates', () => {
  it('registers input change', async () => {
    const user = userEvent.setup();
    render(<MockSpinnerParent />);
    const input = screen.getByRole('spinbutton');

    await user.type(input, '5');
    expect(input).toHaveValue(15);
  });

  it('does not allow input above max', async () => {
    const user = userEvent.setup();
    render(<MockSpinnerParent />);
    const input = screen.getByRole('spinbutton');

    await user.type(input, '200');
    expect(input).toHaveValue(attributes.max);
  });

  it('decrements value on decrement button click', async () => {
    const user = userEvent.setup();
    render(<MockSpinnerParent />);

    const incrementBtn = screen.getByRole('button', {
      name: 'decrement',
    });

    await user.click(incrementBtn);
    expect(screen.getByRole('spinbutton')).toHaveValue(attributes.value - 1);
  });

  it('increments value on increment button click', async () => {
    const user = userEvent.setup();
    render(<MockSpinnerParent />);

    const incrementBtn = screen.getByRole('button', {
      name: 'increment',
    });

    await user.click(incrementBtn);
    expect(screen.getByRole('spinbutton')).toHaveValue(attributes.value + 1);
  });

  it('correctly registers multiple increment/decrement clicks', async () => {
    const user = userEvent.setup();
    render(<MockSpinnerParent />);

    const incrementBtn = screen.getByRole('button', {
      name: 'increment',
    });

    const numClicks = 3;
    for (let i = 0; i < numClicks; i++) await user.click(incrementBtn);
    expect(screen.getByRole('spinbutton')).toHaveValue(attributes.value + numClicks);
  });

  it('does not decrement value below min', async () => {
    const user = userEvent.setup();
    render(<MockSpinnerParent />);

    const incrementBtn = screen.getByRole('button', {
      name: 'decrement',
    });

    for (let i = 0; i < 5; i++) await user.click(incrementBtn);
    expect(screen.getByRole('spinbutton')).toHaveValue(attributes.min);
  });

  it('does not increment value above max', async () => {
    const user = userEvent.setup();
    render(<MockSpinnerParent />);

    const incrementBtn = screen.getByRole('button', {
      name: 'increment',
    });

    const numClicks = attributes.max + 10;
    for (let i = 0; i < numClicks; i++) await user.click(incrementBtn);
    expect(screen.getByRole('spinbutton')).toHaveValue(attributes.max);

  });
});
