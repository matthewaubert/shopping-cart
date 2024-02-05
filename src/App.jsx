import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartIcon from './components/CartIcon';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const { name } = useParams(); // name of url endpoint

  // console.log(cart);
  const colorScheme = name
    ? { cartModalBg: 'white', navBg: 'white' }
    : { cartModalBg: '#f1abba', navBg: 'transparent' };

  return (
    <>
      <Navbar colorScheme={colorScheme}>
        <CartIcon cart={cart} setCart={setCart} colorScheme={colorScheme} />
      </Navbar>
      <main>
        <Outlet context={[cart, setCart]} />
      </main>
    </>
  );
}

export default App;
