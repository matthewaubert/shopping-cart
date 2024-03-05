export interface StoreItem {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { count: number; rate: number };
  title: string;
}

export interface CartItem extends StoreItem {
  quantity: number;
}

export type SetCartFn = React.Dispatch<React.SetStateAction<CartItem[]>>;

export type CartOutletContext = [CartItem[], SetCartFn];

export interface ColorSchemeObj {
  accent: string;
  modalBg: string;
  navBg: string;
}
