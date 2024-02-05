import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartIcon from './components/CartIcon';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const { name } = useParams(); // name of url endpoint

  // console.log(cart);
  const colorScheme = name
    // product pages
    ? { cartModalBg: 'white', footerBg: '#555', navBg: 'white' }
    // home page
    : { cartModalBg: '#f1abba', footerBg: '#d41f56', navBg: 'transparent' };

  return (
    <>
      <Navbar colorScheme={colorScheme}>
        <CartIcon cart={cart} setCart={setCart} colorScheme={colorScheme} />
      </Navbar>
      <main>
        <Outlet context={[cart, setCart]} />
      </main>
      <Footer colorScheme={colorScheme} />
    </>
  );
}

export default App;
