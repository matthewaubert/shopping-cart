import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartIcon from './components/CartIcon';
import Footer from './components/Footer';
import './App.css';

interface CartItem {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { count: number; rate: number };
  title: string;
}

interface ColorSchemeObj {
  accent: string;
  modalBg: string;
  navBg: string;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { name } = useParams(); // name of url endpoint

  const colorScheme: ColorSchemeObj = name
    ? { accent: '#027bb9', modalBg: 'white', navBg: '#f3f4f6' } // product pages
    : { accent: '#d41f56', modalBg: '#fec3d0', navBg: '' }; // home page

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
