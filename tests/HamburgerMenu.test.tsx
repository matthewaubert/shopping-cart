import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HamburgerMenu from '../src/components/HamburgerMenu';

it('opens modal on click if currently closed', async () => {
  const user = userEvent.setup();
  render(
    <HamburgerMenu>
      <div>child element</div>
    </HamburgerMenu>,
  );
  expect(screen.queryByTestId('modal')).toBeNull();

  await user.click(screen.getByRole('button', { name: 'menu' }));
  expect(screen.getByTestId('modal')).toBeInTheDocument();
});

it('closes modal on click if currently open', async () => {
  const user = userEvent.setup();
  render(
    <HamburgerMenu>
      <div>child element</div>
    </HamburgerMenu>,
  );

  const menu = screen.getByRole('button', { name: 'menu' });
  await user.click(menu);
  expect(screen.getByTestId('modal')).toBeInTheDocument();

  await user.click(menu);
  expect(screen.queryByTestId('modal')).toBeNull();
});

it('closes modal if user clicks outside', async () => {
  const user = userEvent.setup();
  render(
    <HamburgerMenu>
      <div>child element</div>
    </HamburgerMenu>,
  );

  await user.click(screen.getByRole('button', { name: 'menu' }));
  expect(screen.getByTestId('modal')).toBeInTheDocument();

  await user.click(screen.getByTestId('modal-bg'));
  expect(screen.queryByTestId('modal')).toBeNull();
});

it('does not render passed-in children elements if closed', () => {
  render(
    <HamburgerMenu>
      <div>child element</div>
    </HamburgerMenu>,
  );

  expect(screen.queryByText('child element')).toBeNull();
});

it('renders passed-in children elements if open', async () => {
  const user = userEvent.setup();
  render(
    <HamburgerMenu>
      <div>child element</div>
    </HamburgerMenu>,
  );

  await user.click(screen.getByRole('button', { name: 'menu' }));

  expect(screen.getByText('child element')).toBeInTheDocument();
});
