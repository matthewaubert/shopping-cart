import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartIcon from './components/CartIcon';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  console.log(cart);

  return (
    <>
      <Navbar>
        <CartIcon cart={cart} setCart={setCart} />
      </Navbar>
      <Outlet context={[cart, setCart]} />
    </>
  );
}

export default App;
