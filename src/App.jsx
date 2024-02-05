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
    ? { accent: '#0284c7', cartModalBg: 'white', navBg: '#f3f4f6' } // product pages
    : { accent: '#d41f56', cartModalBg: '#f1abba', navBg: 'transparent' }; // home page

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
